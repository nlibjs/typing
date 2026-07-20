import * as assert from "node:assert";
import { test } from "node:test";
import { ensure } from "./ensure.ts";
import { isBoolean } from "./is/Boolean.ts";
import { isString } from "./is/String.ts";
import { narrow } from "./narrow.ts";
import { typeChecker } from "./typeChecker.ts";
import type {
	Guarded,
	NarrowingGuard,
	Nominal,
	TypeChecker,
	TypeGuard,
} from "./types.ts";
import { validate, validateAll } from "./validate.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

type EmailAddress = Nominal<string, "EmailAddress">;
const matchesEmailAddressRules: NarrowingGuard<string, EmailAddress> = (
	value,
): value is EmailAddress => /^[^@]+@[^@]+$/.test(value);
const isEmailAddress = narrow(isString, matchesEmailAddressRules);
const _emailAddressGuard: TypeGuard<EmailAddress> = isEmailAddress;
type IsEqual<T, U> =
	(<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2
		? true
		: false;
const _emailAddressType: IsEqual<
	Guarded<typeof isEmailAddress>,
	EmailAddress
> = true;
void _emailAddressGuard;
void _emailAddressType;

test("narrow preserves subtype inference and leaves the predicate reusable", () => {
	assert.equal("test" in isEmailAddress, false);
	const text = "a@example.com";
	assert.equal(matchesEmailAddressRules(text), true);
	if (matchesEmailAddressRules(text)) {
		const email: EmailAddress = text;
		assert.equal(email, text);
	}

	const input: unknown = "a@example.com";
	assert.equal(isEmailAddress(input), true);
	if (isEmailAddress(input)) {
		const email: EmailAddress = input;
		assert.equal(email, input);
	}
	assert.equal(isEmailAddress("invalid"), false);
	assert.equal(isEmailAddress(1), false);
});

test("the boolean path short-circuits and never executes diagnosis", () => {
	type NonEmptyString = Nominal<string, "NonEmptyString">;
	const calls: Array<string> = [];
	const base = (input: unknown): input is string => {
		calls.push("base");
		return typeof input === "string";
	};
	const nonEmpty = (value: string): value is NonEmptyString => {
		calls.push("narrowing");
		return value.length > 0;
	};
	const guard = narrow(base, nonEmpty, () => {
		calls.push("diagnosis");
		return [{ code: "empty_string" }];
	});

	assert.equal(guard(1), false);
	assert.deepEqual(calls, ["base"]);
	calls.length = 0;
	assert.equal(guard(""), false);
	assert.deepEqual(calls, ["base", "narrowing"]);
	calls.length = 0;
	assert.equal(guard("value"), true);
	assert.deepEqual(calls, ["base", "narrowing"]);
});

test("structured validation preserves base failures and short-circuits", () => {
	type NonEmptyString = Nominal<string, "NonEmptyString">;
	let baseCalls = 0;
	let narrowingCalls = 0;
	let diagnosisCalls = 0;
	const base: TypeChecker<string> = typeChecker(
		(input: unknown): input is string => {
			baseCalls++;
			return typeof input === "string";
		},
		"TrackedString",
	);
	const guard = narrow(
		base,
		(value): value is NonEmptyString => {
			narrowingCalls++;
			return value.length > 0;
		},
		() => {
			diagnosisCalls++;
			return [{ code: "empty_string" }];
		},
	);

	assert.deepEqual(validate(1, guard), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.GuardFailed,
			expected: base.toString(),
			actualType: "Number",
		},
	});
	assert.equal(baseCalls, 1);
	assert.equal(narrowingCalls, 0);
	assert.equal(diagnosisCalls, 0);
});

test("custom narrowing diagnostics retain paths and support multiple issues", () => {
	const guard = narrow(isString, matchesEmailAddressRules, function* () {
		yield {
			code: "email_missing_at_sign",
			expected: "an email address containing @",
		};
		yield { code: "email_domain_missing" };
	});
	const checker = typeChecker({ email: guard }, "Contact");

	assert.deepEqual(validate({ email: "invalid" }, checker), {
		ok: false,
		issue: {
			path: ["email"],
			code: "email_missing_at_sign",
			expected: "an email address containing @",
		},
	});
	assert.deepEqual(validateAll({ email: "invalid" }, checker), {
		ok: false,
		issues: [
			{
				path: ["email"],
				code: "email_missing_at_sign",
				expected: "an email address containing @",
			},
			{ path: ["email"], code: "email_domain_missing" },
		],
	});
});

test("failed narrowing without a diagnostic issue uses the generic code", () => {
	type NonEmptyString = Nominal<string, "NonEmptyString">;
	const nonEmpty: NarrowingGuard<string, NonEmptyString> = (
		value,
	): value is NonEmptyString => value.length > 0;
	const withoutDiagnosis = narrow(isString, nonEmpty);
	const withEmptyDiagnosis = narrow(isString, nonEmpty, () => []);
	const expected = {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.NarrowingFailed,
		},
	};

	assert.deepEqual(validate("", withoutDiagnosis), expected);
	assert.deepEqual(validate("", withEmptyDiagnosis), expected);
});

test("diagnosis does not decide validity", () => {
	type AnyString = Nominal<string, "AnyString">;
	let diagnosisCalls = 0;
	const guard = narrow(
		isString,
		(_value): _value is AnyString => true,
		() => {
			diagnosisCalls++;
			return [{ code: "should_not_be_reported" }];
		},
	);

	assert.deepEqual(validate("value", guard), { ok: true, value: "value" });
	assert.equal(diagnosisCalls, 0);
});

test("narrow accepts TypeCheckers and remains compatible with existing APIs", () => {
	type ActiveRecord = { active: boolean } & {
		readonly activeRecord: unique symbol;
	};
	const base = typeChecker({ active: isBoolean }, "Record");
	const guard = narrow(base, (value): value is ActiveRecord => value.active);
	const checker = typeChecker(guard, "ActiveRecord");
	const input = Object.freeze({ active: true });

	assert.equal(checker, guard);
	const result = validate(input, checker);
	assert.equal(result.ok, true);
	if (result.ok) {
		assert.equal(result.value, input);
	}
	assert.equal(ensure(input, guard), input);
	assert.equal(guard({ active: false }), false);
});

test("nested narrowing executes in order and short-circuits", () => {
	type Positive = number & { readonly positive: unique symbol };
	type EvenPositive = Positive & { readonly even: unique symbol };
	const calls: Array<string> = [];
	const base = (input: unknown): input is number => {
		calls.push("base");
		return typeof input === "number";
	};
	const positive = (value: number): value is Positive => {
		calls.push("positive");
		return value > 0;
	};
	const even = (value: Positive): value is EvenPositive => {
		calls.push("even");
		return value % 2 === 0;
	};
	const isPositive = narrow(base, positive, () => {
		calls.push("positive diagnosis");
		return [{ code: "not_positive" }];
	});
	const isEvenPositive = narrow(isPositive, even, () => {
		calls.push("even diagnosis");
		return [{ code: "not_even" }];
	});

	assert.equal(isEvenPositive("2"), false);
	assert.deepEqual(calls, ["base"]);
	calls.length = 0;
	assert.equal(isEvenPositive(-2), false);
	assert.deepEqual(calls, ["base", "positive"]);
	calls.length = 0;
	assert.equal(isEvenPositive(3), false);
	assert.deepEqual(calls, ["base", "positive", "even"]);
	calls.length = 0;
	assert.equal(isEvenPositive(4), true);
	assert.deepEqual(calls, ["base", "positive", "even"]);

	calls.length = 0;
	assert.deepEqual(validate(-2, isEvenPositive), {
		ok: false,
		issue: { path: [], code: "not_positive" },
	});
	assert.deepEqual(calls, ["base", "positive", "positive diagnosis"]);
	calls.length = 0;
	assert.deepEqual(validate(3, isEvenPositive), {
		ok: false,
		issue: { path: [], code: "not_even" },
	});
	assert.deepEqual(calls, ["base", "positive", "even", "even diagnosis"]);
});

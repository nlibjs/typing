import * as assert from "node:assert";
import { test } from "node:test";
import { isString } from "./is/String.ts";
import { fromDiagnosis, narrow } from "./narrow.ts";
import { typeChecker } from "./typeChecker.ts";
import type {
	NarrowingGuard,
	NarrowingIssue,
	Nominal,
	TypeGuard,
} from "./types.ts";
import { validate, validateAll } from "./validate.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

type Title = Nominal<string, "Title">;

function* diagnoseTitle(
	value: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	const length = Array.from(value).length;
	if (length === 0) {
		yield returnIssue ?? {
			code: "too_short",
			expected: "at least 1 code point",
		};
	}
	if (100 < length) {
		yield returnIssue ?? {
			code: "too_long",
			expected: "at most 100 code points",
		};
	}
}

const contextuallyTyped: NarrowingGuard<string, Title> =
	fromDiagnosis(diagnoseTitle);
const explicitlyTyped = fromDiagnosis<string, Title>(diagnoseTitle);
const withoutOutputContext = fromDiagnosis(diagnoseTitle);
const _stringGuard: NarrowingGuard<string, string> = withoutOutputContext;
// @ts-expect-error Output type cannot be inferred from the diagnosis issues.
const _titleGuardWithoutContext: NarrowingGuard<string, Title> =
	withoutOutputContext;
const _titleTypeGuard: TypeGuard<Title> = typeChecker(
	narrow(isString, fromDiagnosis(diagnoseTitle)),
	"Title",
);
const _incompatibleDirectChecker = typeChecker(
	// @ts-expect-error A string diagnosis does not produce an unknown-input guard.
	fromDiagnosis(diagnoseTitle),
	"IncompatibleTitle",
);
void _stringGuard;
void _titleGuardWithoutContext;
void _titleTypeGuard;
void _incompatibleDirectChecker;

test("fromDiagnosis produces a reusable standard narrowing predicate", () => {
	assert.equal(contextuallyTyped("Title"), true);
	assert.equal(contextuallyTyped(""), false);
	assert.equal(explicitlyTyped("Title"), true);

	const value = "Title";
	if (contextuallyTyped(value)) {
		const title: Title = value;
		assert.equal(title, value);
	}
	assert.equal("diagnosis" in contextuallyTyped, false);
	assert.deepEqual(Object.getOwnPropertySymbols(contextuallyTyped), []);
});

test("the boolean path shares its issue, skips details, and stops at the first issue", () => {
	let sharedIssue: NarrowingIssue | undefined;
	let detailedExpressions = 0;
	const calls: Array<string> = [];
	const guard: NarrowingGuard<string, Title> = fromDiagnosis(
		function* (value, returnIssue) {
			calls.push(`start:${value}`);
			assert.ok(returnIssue);
			if (sharedIssue) {
				assert.equal(returnIssue, sharedIssue);
			} else {
				sharedIssue = returnIssue;
			}
			if (value.length === 0) {
				yield returnIssue ?? {
					code: (() => {
						detailedExpressions++;
						return "too_short";
					})(),
				};
				calls.push("after first issue");
				yield returnIssue;
			}
			calls.push("done");
		},
	);

	assert.equal(guard(""), false);
	assert.deepEqual(calls, ["start:"]);
	assert.equal(detailedExpressions, 0);
	assert.equal(guard("valid"), true);
	assert.deepEqual(calls, ["start:", "start:valid", "done"]);
	assert.equal(detailedExpressions, 0);
});

test("structured validation calls a derived diagnosis once and returns details", () => {
	let diagnosisCalls = 0;
	let detailedExpressions = 0;
	const derived: NarrowingGuard<string, Title> = fromDiagnosis(
		function* (value, returnIssue) {
			diagnosisCalls++;
			if (value.length === 0) {
				yield returnIssue ?? {
					code: (() => {
						detailedExpressions++;
						return "too_short";
					})(),
					expected: "at least 1 character",
				};
				yield returnIssue ?? { code: "title_required" };
			}
		},
	);
	const guard = narrow(isString, derived);

	assert.deepEqual(validate("", guard), {
		ok: false,
		issue: {
			path: [],
			code: "too_short",
			expected: "at least 1 character",
		},
	});
	assert.equal(diagnosisCalls, 1);
	assert.equal(detailedExpressions, 1);

	diagnosisCalls = 0;
	detailedExpressions = 0;
	assert.deepEqual(validateAll("", guard), {
		ok: false,
		issues: [
			{
				path: [],
				code: "too_short",
				expected: "at least 1 character",
			},
			{ path: [], code: "title_required" },
		],
	});
	assert.equal(diagnosisCalls, 1);
	assert.equal(detailedExpressions, 1);
});

test("structured validation preserves base failures and successful identity", () => {
	let diagnosisCalls = 0;
	const base = typeChecker(
		(input: unknown): input is string => typeof input === "string",
		"TrackedString",
	);
	const derived: NarrowingGuard<string, Title> = fromDiagnosis((value) => {
		diagnosisCalls++;
		return diagnoseTitle(value);
	});
	const guard = narrow(base, derived);

	assert.deepEqual(validate(1, guard), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.GuardFailed,
			expected: base.toString(),
			actualType: "Number",
		},
	});
	assert.equal(diagnosisCalls, 0);

	const input = "Title";
	const result = validate(input, guard);
	assert.deepEqual(result, { ok: true, value: input });
	assert.equal(diagnosisCalls, 1);
});

test("an unknown-input diagnosis is directly compatible with typeChecker", () => {
	function* diagnoseUnknownTitle(
		value: unknown,
		returnIssue?: NarrowingIssue,
	): Iterable<NarrowingIssue> {
		if (typeof value !== "string") {
			yield returnIssue ?? { code: "not_a_string" };
			return;
		}
		yield* diagnoseTitle(value, returnIssue);
	}
	const guard: NarrowingGuard<unknown, Title> =
		fromDiagnosis(diagnoseUnknownTitle);
	const checker = typeChecker(guard, "Title");

	assert.equal(checker, guard);
	assert.equal(checker("Title"), true);
	assert.equal(checker(""), false);
	assert.equal(checker(1), false);
});

test("errors after the first diagnosis remain lazy on the boolean path", () => {
	const error = new Error("diagnosis failed");
	const guard: NarrowingGuard<string, Title> = fromDiagnosis(
		function* (_value, returnIssue) {
			yield returnIssue ?? { code: "first_issue" };
			throw error;
		},
	);

	assert.equal(guard("invalid"), false);
	assert.throws(
		() =>
			fromDiagnosis<string, Title>(function* (_value, returnIssue) {
				if (!returnIssue) {
					yield { code: "details_only" };
				}
				throw error;
			})("invalid"),
		error,
	);
});

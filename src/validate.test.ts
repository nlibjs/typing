import * as assert from "node:assert";
import { test } from "node:test";
import { isBoolean } from "./is/Boolean.ts";
import { isString } from "./is/String.ts";
import {
	isArrayOf,
	isDictionaryOf,
	isObjectWith,
	isOptionalOf,
	typeChecker,
} from "./typeChecker.ts";
import type { ValidationIssue } from "./types.ts";
import { validate, validateAll } from "./validate.ts";
import {
	ValidationIssueCode,
	type ValidationIssueCode as ValidationIssueCodeType,
} from "./validationIssue.ts";

const definition = {
	name: isString,
	items: isArrayOf({
		label: isString,
		active: isBoolean,
	}),
};

test("validate returns the first nested issue", () => {
	const result = validate(
		{
			name: 1,
			items: [
				{ label: 2, active: "yes" },
				{ label: 3, active: false },
			],
		},
		definition,
	);

	assert.deepEqual(result, {
		ok: false,
		issue: {
			path: ["name"],
			code: ValidationIssueCode.GuardFailed,
			expected: "TypeChecker<isstring>",
			actualType: "Number",
		},
	});
	assert.equal("issues" in result, false);
});

test("validate stops after the first issue", () => {
	let calls = 0;
	const isRejected = (_input: unknown): _input is never => {
		calls++;
		return false;
	};
	const isRejectedArray = isArrayOf(isRejected);

	const first = validate([1, 2, 3], isRejectedArray);
	assert.equal(first.ok, false);
	assert.equal(calls, 1);

	calls = 0;
	const all = validateAll([1, 2, 3], isRejectedArray);
	assert.equal(all.ok, false);
	assert.equal(calls, 3);
	if (!all.ok) {
		assert.equal(all.issues.length, 3);
	}
});

test("validateAll returns every nested object and array issue", () => {
	const result = validateAll(
		{
			name: 1,
			items: [
				{ label: 2, active: "yes" },
				{ label: 3, active: false },
			],
		},
		definition,
	);

	assert.equal(result.ok, false);
	if (result.ok) {
		return;
	}
	assert.deepEqual(
		result.issues.map(({ path, code, actualType }) => ({
			path,
			code,
			actualType,
		})),
		[
			{
				path: ["name"],
				code: ValidationIssueCode.GuardFailed,
				actualType: "Number",
			},
			{
				path: ["items", 0, "label"],
				code: ValidationIssueCode.GuardFailed,
				actualType: "Number",
			},
			{
				path: ["items", 0, "active"],
				code: ValidationIssueCode.GuardFailed,
				actualType: "String",
			},
			{
				path: ["items", 1, "label"],
				code: ValidationIssueCode.GuardFailed,
				actualType: "Number",
			},
		],
	);
	const firstIssue: ValidationIssue = result.issues[0];
	const firstCode: ValidationIssueCodeType = firstIssue.code;
	assert.deepEqual(firstIssue.path, ["name"]);
	assert.equal(firstCode, ValidationIssueCode.GuardFailed);
});

test("circular references return structured issues", () => {
	const checker = typeChecker(
		{
			value: isString,
			sub: { value: isString },
		},
		"CircularNode",
	);
	const input = {
		value: "root",
		sub: { value: "child" },
	};
	input.sub = input;
	const expectedIssue = {
		path: ["sub"],
		code: ValidationIssueCode.CircularReference,
		expected: "TypeChecker<CircularNode.sub {\n  value: isstring,\n}>",
		actualType: "Object",
	};

	assert.deepEqual(validate(input, checker), {
		ok: false,
		issue: expectedIssue,
	});
	assert.deepEqual(validateAll(input, checker), {
		ok: false,
		issues: [expectedIssue],
	});
});

test("successful validation preserves object identity", () => {
	const input = {
		name: "example",
		items: [{ label: "item", active: true }],
	};
	const first = validate(input, definition);
	const all = validateAll(input, definition);

	assert.equal(first.ok, true);
	assert.equal(all.ok, true);
	if (first.ok && all.ok) {
		assert.equal(first.value, input);
		assert.equal(all.value, input);
		const name: string = first.value.name;
		assert.equal(name, "example");
	}
});

test("a plain guard contributes one generic issue", () => {
	const result = validateAll(1, isString);
	assert.deepEqual(result, {
		ok: false,
		issues: [
			{
				path: [],
				code: ValidationIssueCode.GuardFailed,
				expected: "TypeChecker<isstring>",
				actualType: "Number",
			},
		],
	});
});

test("structural mismatch reports the input runtime type", () => {
	const result = validateAll({ name: "example", items: null }, definition);
	assert.equal(result.ok, false);
	if (result.ok) {
		return;
	}
	assert.deepEqual(result.issues[0], {
		path: ["items"],
		code: ValidationIssueCode.TypeMismatch,
		// Unnamed type numbers depend on the test runner's module load order.
		expected: definition.items.toString(),
		actualType: "Null",
	});
});

test("built-in definitions report their specific issue codes", () => {
	assert.deepEqual(validate(null, "Date"), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.TypeMismatch,
			expected: "TypeChecker<Date>",
			actualType: "Null",
		},
	});
	assert.deepEqual(validate("invalid", /^valid$/), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.PatternMismatch,
			expected: "TypeChecker</^valid$/>",
			actualType: "String",
		},
	});
	assert.deepEqual(validate("green", new Set(["red", "blue"])), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.ValueMismatch,
			expected: 'TypeChecker<"red" | "blue">',
			actualType: "String",
		},
	});
});

test("dictionary validation reports structural and entry issues", () => {
	const checker = isDictionaryOf(isString, "StringDictionary");
	assert.equal(checker(null), false);
	assert.deepEqual(validate(null, checker), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.TypeMismatch,
			expected: "TypeChecker<Record<string, isstring>>",
			actualType: "Null",
		},
	});
	const input = { valid: "value", invalid: 1 };
	const expectedIssue = {
		path: ["invalid"],
		code: ValidationIssueCode.GuardFailed,
		expected: "TypeChecker<isstring>",
		actualType: "Number",
	};
	assert.deepEqual(validate(input, checker), {
		ok: false,
		issue: expectedIssue,
	});
	assert.deepEqual(validateAll(input, checker), {
		ok: false,
		issues: [expectedIssue],
	});
});

test("optional validation accepts undefined and reports invalid values", () => {
	const checker = isOptionalOf(isString, "OptionalString");
	assert.equal(checker.toString(), "TypeChecker<isstring | undefined>");
	assert.deepEqual(validate(undefined, checker), {
		ok: true,
		value: undefined,
	});
	assert.deepEqual(validate(1, checker), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.GuardFailed,
			expected: "TypeChecker<isstring>",
			actualType: "Number",
		},
	});
});

test("root object mismatch reports a structured issue", () => {
	const checker = typeChecker({ value: isString }, "NamedObject");
	assert.deepEqual(validate(null, checker), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.TypeMismatch,
			expected: "TypeChecker<NamedObject {\n  value: isstring,\n}>",
			actualType: "Null",
		},
	});
});

test("exact and open objects retain their structured validation behavior", () => {
	const exact = typeChecker({ name: isString }, "ExactPerson");
	const open = isObjectWith({ name: isString }, "OpenPerson");
	const input = { name: 1, extra: true };

	assert.deepEqual(validate(input, exact), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.TypeMismatch,
			expected: "TypeChecker<ExactPerson {\n  name: isstring,\n}>",
			actualType: "Object",
		},
	});
	const all = validateAll(input, exact);
	assert.equal(all.ok, false);
	if (!all.ok) {
		assert.deepEqual(
			all.issues.map(({ path, code }) => ({ path, code })),
			[
				{ path: [], code: ValidationIssueCode.TypeMismatch },
				{ path: ["name"], code: ValidationIssueCode.GuardFailed },
			],
		);
	}
	assert.deepEqual(validate({ name: "Ada", extra: true }, open), {
		ok: true,
		value: { name: "Ada", extra: true },
	});
});

test("exact object validation preserves its input without sanitizing it", () => {
	const checker = typeChecker({ name: isString });
	const input = Object.freeze({ name: "Ada" });
	const before = Object.getOwnPropertyDescriptors(input);
	const result = validate(input, checker);

	assert.equal(result.ok, true);
	if (result.ok) {
		assert.equal(result.value, input);
	}
	assert.deepEqual(Object.getOwnPropertyDescriptors(input), before);
	assert.equal(Object.isFrozen(input), true);
});

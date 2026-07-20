import * as assert from "node:assert";
import { test } from "node:test";
import { isBoolean } from "./is/Boolean.ts";
import { isString } from "./is/String.ts";
import { isArrayOf, typeChecker } from "./typeChecker.ts";
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

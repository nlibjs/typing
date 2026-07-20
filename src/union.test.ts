import * as assert from "node:assert";
import { test } from "node:test";
import { ensure } from "./ensure.ts";
import { isNever } from "./is/Never.ts";
import { isString } from "./is/String.ts";
import { isObjectWith, typeChecker } from "./typeChecker.ts";
import type { Guarded, TypeChecker, TypeGuard } from "./types.ts";
import { union } from "./union.ts";
import { validate, validateAll } from "./validate.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

type IsEqual<T, U> =
	(<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2
		? true
		: false;

const isNumber = (input: unknown): input is number => typeof input === "number";
const isBoolean = (input: unknown): input is boolean =>
	typeof input === "boolean";

const emptyUnion = union();
const _emptyUnionType: IsEqual<typeof emptyUnion, typeof isNever> = true;

const singletonChecker = typeChecker({ value: isString }, "Singleton");
const singletonUnion = union(singletonChecker);
const _singletonUnionType: IsEqual<
	typeof singletonUnion,
	typeof singletonChecker
> = true;
const _singletonTypeChecker: TypeChecker<{ value: string }> = singletonUnion;

const isCircle = typeChecker({
	kind: new Set(["circle"] as const),
	radius: isNumber,
});
const isSquare = typeChecker({
	kind: new Set(["square"] as const),
	side: isNumber,
});
const isShape = union(isCircle, isSquare);
const _shapeType: IsEqual<
	Guarded<typeof isShape>,
	| { readonly kind: "circle"; readonly radius: number }
	| { readonly kind: "square"; readonly side: number }
> = true;
const _shapeGuard: TypeGuard<
	{ kind: "circle"; radius: number } | { kind: "square"; side: number }
> = isShape;

const variadicUnion = union(isString, isNumber, isBoolean);
const _variadicType: IsEqual<
	Guarded<typeof variadicUnion>,
	string | number | boolean
> = true;

void _emptyUnionType;
void _singletonUnionType;
void _singletonTypeChecker;
void _shapeType;
void _shapeGuard;
void _variadicType;

test("zero and one guard preserve the required singleton identities", () => {
	assert.equal(emptyUnion, isNever);
	assert.equal(emptyUnion("value"), false);
	assert.equal(singletonUnion, singletonChecker);
	assert.equal(singletonUnion({ value: "text" }), true);
	assert.equal(singletonUnion({ value: 1 }), false);

	const rawGuard = (input: unknown): input is symbol =>
		typeof input === "symbol";
	assert.equal(union(rawGuard), rawGuard);
});

test("a combined union remains anonymous for typeChecker wrapping", () => {
	const combined = union(isString, isNumber);
	assert.equal(combined.name, "");
	const checker = typeChecker(combined, "StringOrNumber");
	assert.equal(checker.name, "");
	assert.equal(checker.toString(), "TypeChecker<isStringOrNumber>");
});

test("object guards infer and validate a discriminated union", () => {
	const circle = Object.freeze({ kind: "circle" as const, radius: 2 });
	const square = { kind: "square" as const, side: 3 };

	assert.equal(isShape(circle), true);
	assert.equal(isShape(square), true);
	assert.equal(isShape({ kind: "circle", side: 2 }), false);
	assert.equal(isShape({ kind: "triangle", side: 2 }), false);

	const result = validate(circle, isShape);
	assert.deepEqual(result, { ok: true, value: circle });
	if (result.ok) {
		assert.equal(result.value, circle);
	}
	assert.equal(ensure(square, isShape), square);
});

test("boolean evaluation follows argument order and stops at first success", () => {
	const calls: Array<string> = [];
	const first = (_input: unknown): _input is never => {
		calls.push("first");
		return false;
	};
	const second = (_input: unknown): _input is string => {
		calls.push("second");
		return true;
	};
	const third = (_input: unknown): _input is unknown => {
		calls.push("third");
		return true;
	};

	assert.equal(union(first, second, third)("value"), true);
	assert.deepEqual(calls, ["first", "second"]);

	calls.length = 0;
	assert.equal(union(first, first)("value"), false);
	assert.deepEqual(calls, ["first", "first"]);
});

test("structured validation stops at the first successful branch", () => {
	const calls: Array<string> = [];
	const first = (input: unknown): input is number => {
		calls.push("first");
		return typeof input === "number";
	};
	const second = (input: unknown): input is string => {
		calls.push("second");
		return typeof input === "string";
	};
	const third = (input: unknown): input is boolean => {
		calls.push("third");
		return typeof input === "boolean";
	};
	const checker = union(first, second, third);

	assert.deepEqual(validateAll("value", checker), {
		ok: true,
		value: "value",
	});
	assert.deepEqual(calls, ["first", "second"]);
});

test("first-error validation reports only no_union_member at the union path", () => {
	const checker = typeChecker({ choice: isShape }, "ShapeContainer");
	const result = validate(
		{ choice: { kind: "triangle", side: "wide" } },
		checker,
	);

	assert.deepEqual(result, {
		ok: false,
		issue: {
			path: ["choice"],
			code: ValidationIssueCode.NoUnionMember,
		},
	});
	if (!result.ok) {
		assert.equal("expected" in result.issue, false);
		assert.equal("actualType" in result.issue, false);
	}
});

test("all-errors validation appends every branch issue in argument order", () => {
	const isKindA = isObjectWith(
		{ kind: new Set(["a"]), value: isString },
		"KindA",
	);
	const isKindB = isObjectWith(
		{ kind: new Set(["b"]), enabled: isBoolean },
		"KindB",
	);
	const isDate = (input: unknown): input is Date => input instanceof Date;
	const checker = typeChecker(
		{ choice: union(isKindA, isKindB, isDate) },
		"ChoiceContainer",
	);

	const result = validateAll(
		{ choice: { kind: "c", value: 1, enabled: "yes" } },
		checker,
	);
	assert.equal(result.ok, false);
	if (result.ok) {
		return;
	}
	assert.deepEqual(
		result.issues.map(({ path, code }) => ({ path, code })),
		[
			{ path: ["choice"], code: ValidationIssueCode.NoUnionMember },
			{ path: ["choice", "kind"], code: ValidationIssueCode.ValueMismatch },
			{ path: ["choice", "value"], code: ValidationIssueCode.GuardFailed },
			{ path: ["choice", "kind"], code: ValidationIssueCode.ValueMismatch },
			{
				path: ["choice", "enabled"],
				code: ValidationIssueCode.GuardFailed,
			},
			{ path: ["choice"], code: ValidationIssueCode.GuardFailed },
		],
	);
	assert.deepEqual(result.issues[0], {
		path: ["choice"],
		code: ValidationIssueCode.NoUnionMember,
	});
});

test("all-errors validation evaluates each failed plain guard once", () => {
	const calls: Array<string> = [];
	const first = (_input: unknown): _input is string => {
		calls.push("first");
		return false;
	};
	const second = (_input: unknown): _input is number => {
		calls.push("second");
		return false;
	};
	const result = validateAll(null, union(first, second));

	assert.equal(result.ok, false);
	assert.deepEqual(calls, ["first", "second"]);
	if (!result.ok) {
		assert.deepEqual(
			result.issues.map(({ code }) => code),
			[
				ValidationIssueCode.NoUnionMember,
				ValidationIssueCode.GuardFailed,
				ValidationIssueCode.GuardFailed,
			],
		);
	}
});

test("exact and open object behavior remains controlled by the input guards", () => {
	const exact = union(
		typeChecker({ kind: new Set(["a"] as const) }, "ExactA"),
		typeChecker({ kind: new Set(["b"] as const) }, "ExactB"),
	);
	const open = union(
		isObjectWith({ kind: new Set(["a"] as const) }, "OpenA"),
		isObjectWith({ kind: new Set(["b"] as const) }, "OpenB"),
	);
	const input = { kind: "a", extra: true };

	assert.equal(exact(input), false);
	assert.equal(open(input), true);
	assert.deepEqual(validate(input, open), { ok: true, value: input });
});

test("union composes non-object guards without transforming the input", () => {
	class Token {}
	const isToken = (input: unknown): input is Token => input instanceof Token;
	const checker = union(isToken, isString);
	const token = Object.freeze(new Token());

	assert.equal(checker(token), true);
	assert.equal(checker("token"), true);
	assert.equal(checker(1), false);
	const result = validateAll(token, checker);
	assert.deepEqual(result, { ok: true, value: token });
	if (result.ok) {
		assert.equal(result.value, token);
	}
});

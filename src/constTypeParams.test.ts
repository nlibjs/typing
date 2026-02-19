/**
 * Tests for `const` type parameter inference.
 *
 * TypeScript 5.0 introduced `const` type parameters, which make the compiler
 * infer the most specific (literal) type for a type argument instead of
 * widening it. This file verifies that `typeChecker`, `isOptionalOf`,
 * `isArrayOf`, and `isDictionaryOf` all leverage `const T` so that
 * Set-based definitions produce literal union types rather than `string`.
 */
import * as assert from "node:assert";
import { test } from "node:test";
import {
	isArrayOf,
	isDictionaryOf,
	isOptionalOf,
	typeChecker,
} from "./typeChecker.ts";
import type { TypeChecker } from "./types.ts";

// ---------------------------------------------------------------------------
// Compile-time assertions
//
// The explicit type annotations below act as type-level tests: TypeScript
// raises a compile error if the inferred type does not match the annotation.
// Without `const T`, `typeChecker(new Set(["a", "b"]))` would return
// `TypeChecker<string>`, which is *not* assignable to
// `TypeChecker<"a" | "b">`, so the line would fail `tsc`.
// ---------------------------------------------------------------------------

/** Verify typeChecker infers literal union from a Set of string literals. */
const _isAB: TypeChecker<"a" | "b"> = typeChecker(new Set(["a", "b"]));
/** Verify isOptionalOf infers literal union from a Set of string literals. */
const _isOptionalAB: TypeChecker<"a" | "b" | undefined> = isOptionalOf(
	new Set(["a", "b"]),
);
/** Verify isArrayOf infers literal union from a Set of string literals. */
const _isArrayAB: TypeChecker<Array<"a" | "b">> = isArrayOf(
	new Set(["a", "b"]),
);
/** Verify isDictionaryOf infers literal union from a Set of string literals. */
const _isDictAB: TypeChecker<Record<string, "a" | "b">> = isDictionaryOf(
	new Set(["a", "b"]),
);

// Suppress "declared but never used" warnings.
void _isAB;
void _isOptionalAB;
void _isArrayAB;
void _isDictAB;

// ---------------------------------------------------------------------------
// Runtime tests
// ---------------------------------------------------------------------------

test("typeChecker(Set) accepts members and rejects non-members", () => {
	const isColor = typeChecker(new Set(["red", "green", "blue"]));
	assert.equal(isColor("red"), true);
	assert.equal(isColor("green"), true);
	assert.equal(isColor("blue"), true);
	assert.equal(isColor("yellow"), false);
	assert.equal(isColor(42), false);
	assert.equal(isColor(null), false);
});

test("isOptionalOf(Set) accepts members and undefined", () => {
	const isOptionalColor = isOptionalOf(new Set(["red", "green", "blue"]));
	assert.equal(isOptionalColor("red"), true);
	assert.equal(isOptionalColor(undefined), true);
	assert.equal(isOptionalColor("yellow"), false);
});

test("isArrayOf(Set) accepts arrays of members", () => {
	const isColors = isArrayOf(new Set(["red", "green", "blue"]));
	assert.equal(isColors(["red", "green"]), true);
	assert.equal(isColors([]), true);
	assert.equal(isColors(["red", "yellow"]), false);
});

test("isDictionaryOf(Set) accepts records of members", () => {
	const isColorDictionary = isDictionaryOf(new Set(["red", "green", "blue"]));
	assert.equal(isColorDictionary({ a: "red", b: "green" }), true);
	assert.equal(isColorDictionary({}), true);
	assert.equal(isColorDictionary({ a: "yellow" }), false);
});

test("typeChecker(Set) works with numeric literals", () => {
	const isSmallInt: TypeChecker<1 | 2 | 3> = typeChecker(new Set([1, 2, 3]));
	assert.equal(isSmallInt(1), true);
	assert.equal(isSmallInt(3), true);
	assert.equal(isSmallInt(4), false);
});

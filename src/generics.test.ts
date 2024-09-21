import { test } from "node:test";
import * as assert from "node:assert";
import { testValue } from "./testValue.ts";
import { createTypeChecker } from "./createTypeChecker.ts";
import type {
	DefinedType,
	GuardedType,
	Merge,
	Nominal,
	TypeGuard,
	UndefinedAsOptional,
} from "./generics.ts";
import { isPositiveSafeInteger } from "./is/PositiveSafeInteger.ts";
import { isString } from "./is/String.ts";
import { isNegativeSafeInteger } from "./is/NegativeSafeInteger.ts";
import { definition } from "./definition.ts";

test("UndefinedAsOptional", () => {
	interface A1 {
		foo: string;
		bar: number | undefined;
	}
	// const a1: A1 = {foo: 'foo'};
	type A2 = UndefinedAsOptional<A1>;
	const a2: A2 = { foo: "foo" };
	assert.deepStrictEqual(a2, a2);
});

test("Defined", () => {
	const definitions = {
		foo: isString,
		bar: isPositiveSafeInteger.optional,
	};
	// const a1: A1 = {foo: 'foo'};
	type A2 = DefinedType<typeof definitions>;
	const a2: A2 = { foo: "foo" };
	assert.deepStrictEqual(a2, a2);
});

test("Nominal", () => {
	type Price1 = Nominal<number, "Price">;
	const isPrice: TypeGuard<Price1> = (input: unknown): input is Price1 =>
		isPositiveSafeInteger(input);
	/** This should be equal to Price1 */
	type Price2 = GuardedType<typeof isPrice>;
	const productDefinition = {
		price: isPrice,
		name: isString,
		description: isString.optional,
	};
	type Defined = DefinedType<typeof productDefinition>;
	const price = 123 as Price2;
	const product: Defined = { price, name: "product" };
	assert.deepStrictEqual(product, product);
});

test("Merge", () => {
	interface Type {
		A: { a: number };
		B: { b: string };
	}
	const c: Merge<Type["A"], Type["B"]> = { a: 1, b: "1" };
	assert.deepStrictEqual(c.a, 1);
});

test("DefinedType (optional string)", () => {
	const definitions = { a: { value: isString.optional } };
	type D = DefinedType<typeof definitions>;
	/** a1 is optional */
	const a: D["a"] = {};
	assert.equal(testValue(a, definitions.a), true);
});

test("DefinedType (array of template string)", () => {
	const isA = createTypeChecker(definition.enum<"a">("a"));
	const definitions = { a: { value: isA.array } };
	type D = DefinedType<typeof definitions>;
	const a: D["a"] = { value: ["a", "a"] };
	assert.equal(testValue(a, definitions.a), true);
});

test("DefinedType (tuple)", () => {
	const isA = createTypeChecker(
		(input: unknown): input is ["a"] =>
			Array.isArray(input) && input[0] === "a",
	);
	const definitions = { a: { value: isA } };
	type D = DefinedType<typeof definitions>;
	const a: D["a"] = { value: ["a"] };
	assert.equal(testValue(a, definitions.a), true);
});

test("DefinedType (definition.some)", () => {
	const definitions = {
		a: { value: definition.some(isPositiveSafeInteger, isNegativeSafeInteger) },
	};
	type D = DefinedType<typeof definitions>;
	const a: D["a"] = { value: 123 };
	/** a.value is a number */
	a.value.toFixed(0);
	assert.equal(testValue(a, definitions.a), true);
});

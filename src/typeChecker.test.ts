import * as assert from "node:assert";
import { test } from "node:test";
import { isString } from "./is/String.ts";
import {
	isArrayOf,
	isObjectWith,
	isOptionalOf,
	typeChecker,
	typeCheckerConfig,
} from "./typeChecker.ts";
import type { Nominal, TypeChecker } from "./types.ts";

test("Should able to define tree structures", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	interface MyNode {
		id: string;
		children: Array<MyNode>;
	}
	const isT: TypeChecker<MyNode> = typeChecker<MyNode>(
		{
			id: /^[0-9a-z]+$/,
			get children() {
				return isArrayOf(isT);
			},
		},
		"MyNode",
	);
	assert.equal(
		isT({
			id: "a",
			children: [
				{
					id: "b",
					children: [{ id: "c", children: [{ id: "d", children: [] }] }],
				},
			],
		}),
		true,
	);
	assert.equal(
		isT({
			id: "a",
			children: [
				{
					id: "b",
					children: [{ id: "c", children: [{ id: "D", children: [] }] }],
				},
			],
		}),
		false,
	);
});

test("Should return the same object when generated from a TypeChecker.", () => {
	type MyType = "MyType";
	const typeGuard = (input: unknown): input is MyType => input === "MyType";
	const isMyType = typeChecker(typeGuard, "MyType");
	assert.equal(isMyType, typeChecker(isMyType));
});

test("Should detect circular references.", () => {
	type Score = Nominal<number, "Score">;
	const isScore = (input: unknown): input is Score => typeof input === "number";
	const isT = typeChecker({ v: isScore, sub: { v: isScore } });
	assert.equal(isT(null), false);
	const obj = { v: 1, sub: { v: 1 } };
	assert.equal(isT(obj), true);
	obj.sub = obj;
	assert.throws(() => isT(obj), /^Error: CircularReference:/);
});

test("Should test type guards and object definitions.", () => {
	const isText = typeChecker(
		(input: unknown): input is string => typeof input === "string",
		"Text",
	);
	assert.equal(isText.test("value"), null);

	const isNamedObject = typeChecker({ name: isText }, "NamedObject");
	assert.equal(isNamedObject.test({ name: "value" }), null);
	const rootError = isNamedObject.test(null);
	assert.ok(rootError instanceof Error);
	assert.match(rootError.message, /^TypeCheckError: The value /);
	const propertyError = isNamedObject.test({ name: 1 });
	assert.ok(propertyError instanceof Error);
	assert.match(propertyError.message, /^TypeCheckError: \.name /);
});

test("exact object definitions reject unknown and missing own properties", () => {
	const isPerson = typeChecker({ name: isString }, "Person");

	assert.equal(isPerson({ name: "Ada" }), true);
	assert.equal(isPerson({ name: "Ada", role: "admin" }), false);
	assert.equal(isPerson({}), false);
	assert.equal(isPerson({ toString: "Ada" }), false);

	const isObjectWithOwnToString = typeChecker({ toString: isString });
	assert.equal(isObjectWithOwnToString({}), false);
	assert.equal(isObjectWithOwnToString({ toString: "value" }), true);
});

test("exact object tests identify unexpected properties", () => {
	const isPerson = typeChecker({ name: isString }, "Person");
	const error = isPerson.test({ name: "Ada", role: "admin" });

	assert.ok(error instanceof Error);
	assert.match(error.message, /Unexpected property \.role\./);
	assert.match(error.message, /TypeChecker<Person/);
	assert.match(error.message, /requires an exact object/);
	assert.match(error.message, /use isObjectWith\(\.\.\.\)/);
	assert.doesNotMatch(error.message, /\[object Object\]/);
});

test("exact object definitions accept optional, symbol, and hidden properties", () => {
	const symbol = Symbol("metadata");
	const isPerson = typeChecker({
		name: isString,
		nickname: isOptionalOf(isString),
	});
	const input: {
		name: string;
		nickname?: string;
		[symbol]: number;
		hidden?: number;
	} = { name: "Ada", [symbol]: 1 };
	Object.defineProperty(input, "hidden", { enumerable: false, value: 2 });

	assert.equal(isPerson(input), true);
	input.nickname = undefined;
	assert.equal(isPerson(input), true);
	input.nickname = "A";
	assert.equal(isPerson(input), true);
});

test("exact object definitions accept Object.prototype and null prototypes", () => {
	const checker = typeChecker({ name: isString });
	const nullPrototype = Object.assign(Object.create(null), { name: "Ada" });

	assert.equal(checker({ name: "Ada" }), true);
	assert.equal(checker(nullPrototype), true);
});

test("exact object definitions reject arrays, functions, and class instances", () => {
	class Person {
		name = "Ada";
	}
	const isNamed = typeChecker({ name: isString });
	const array = Object.assign([], { name: "Ada" });
	const fn = Object.assign(() => undefined, { nameValue: "Ada" });

	assert.equal(isNamed(array), false);
	assert.equal(typeChecker({ nameValue: isString })(fn), false);
	assert.equal(isNamed(new Person()), false);
});

test("nested definitions are exact unless isObjectWith is explicit", () => {
	const exact = typeChecker({ profile: { name: isString } });
	const openNested = typeChecker({
		profile: isObjectWith({ name: isString }),
	});
	const input = { profile: { name: "Ada", role: "admin" } };

	assert.equal(exact(input), false);
	assert.equal(openNested(input), true);
	assert.equal(openNested({ ...input, rootExtra: true }), false);
});

test("isObjectWith preserves open shape matching", () => {
	class Person {
		name = "Ada";
	}
	const definition = { name: isString };
	const checker = isObjectWith(definition, "NamedShape");
	const inherited = Object.create({ name: "Ada" });
	const array = Object.assign([], { name: "Ada" });
	const namedFunction = function Ada() {};

	assert.equal(checker({ name: "Ada", role: "admin" }), true);
	assert.equal(checker(inherited), true);
	assert.equal(checker(array), true);
	assert.equal(checker(namedFunction), true);
	assert.equal(checker(new Person()), true);
	assert.equal(checker({ role: "admin" }), false);
	assert.equal(checker(null), false);
	assert.equal(checker, isObjectWith(definition));
	assert.notEqual(checker, typeChecker(definition));
	assert.equal(`${checker}`, "TypeChecker<NamedShape {\n  name: isstring,\n}>");
});

test("Should expose cache and unnamed type configuration.", () => {
	const originalCount = typeCheckerConfig.getNoNameTypeCount();
	typeCheckerConfig.resetNoNameTypeCount(40);
	assert.equal(typeCheckerConfig.getNoNameTypeCount(), 40);

	const definition = { value: /value/ };
	const first = typeChecker(definition, "CachedObject");
	assert.equal(typeChecker(definition), first);
	typeCheckerConfig.clearCache();
	assert.notEqual(typeChecker(definition, "FreshObject"), first);
	assert.equal(typeChecker(first), first);
	typeCheckerConfig.resetNoNameTypeCount(originalCount);
});

test("Should serialize definitions (type guard)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker(function isFoo() {
		return true;
	});
	assert.equal(`${isT1}`, "TypeChecker<isFoo>");
	const isT2 = typeChecker(function isFoo() {
		return true;
	}, "MyType");
	assert.equal(`${isT2}`, "TypeChecker<isFoo>");
});

test("Should serialize definitions (string)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker("MyClass");
	assert.equal(`${isT1}`, "TypeChecker<MyClass>");
	const isT2 = typeChecker("MyClass", "MyType");
	assert.equal(`${isT2}`, "TypeChecker<MyClass>");
});

test("Should serialize definitions (RegExp)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker(/^[0-9a-f]{4}$/);
	assert.equal(`${isT1}`, "TypeChecker</^[0-9a-f]{4}$/>");
	const isT2 = typeChecker(/^[0-9a-f]{4}$/, "MyType");
	assert.equal(`${isT2}`, "TypeChecker</^[0-9a-f]{4}$/>");
});

test("Should serialize definitions (Set)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker(new Set(["a", "b", "c"]));
	assert.equal(`${isT1}`, 'TypeChecker<"a" | "b" | "c">');
	const isT2 = typeChecker(new Set(["a", "b", "c"]), "MyType");
	assert.equal(`${isT2}`, 'TypeChecker<"a" | "b" | "c">');
});

test("Should serialize definitions (Object)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker({ a: /a/ });
	assert.equal(`${isT1}`, "TypeChecker<T1 {\n  a: /a/,\n}>");
	const isT2 = typeChecker({ a: /a/ }, "MyType");
	assert.equal(`${isT2}`, "TypeChecker<MyType {\n  a: /a/,\n}>");
});

test("Should serialize definitions (Array)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker({ a: /a/ });
	assert.equal(`${isArrayOf(isT1)}`, "TypeChecker<Array<T1 {\n  a: /a/,\n}>>");
	const isT2 = typeChecker({ a: /a/ }, "MyType");
	assert.equal(
		`${isArrayOf(isT2)}`,
		"TypeChecker<Array<MyType {\n  a: /a/,\n}>>",
	);
});

test("Should serialize definitions (Recursive)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	interface MyNode {
		id: string;
		children: Array<MyNode>;
	}
	const isT: TypeChecker<MyNode> = typeChecker<MyNode>(
		{
			id: /^[0-9a-z]+$/,
			get children() {
				return isArrayOf(isT);
			},
		},
		"MyNode",
	);
	const actual = `${isT}`;
	const expected = [
		"TypeChecker<MyNode {",
		"  id: /^[0-9a-z]+$/,",
		"  children: Array<Ref:MyNode>,",
		"}>",
	].join("\n");
	assert.equal(actual, expected);
});

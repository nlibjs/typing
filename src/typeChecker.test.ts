import { test } from "node:test";
import * as assert from "node:assert";
import { typeCheckerConfig, typeChecker, isArrayOf } from "./typeChecker.ts";
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

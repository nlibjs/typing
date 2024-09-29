import { test } from "node:test";
import * as assert from "node:assert";
import { typeCheckerConfig, typeChecker } from "./typeChecker.ts";
import type { Nominal } from "./types.ts";

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
	assert.equal(`${isT1}`, "TypeChecker<T1>\nT1 = isFoo");
	const isT2 = typeChecker(function isFoo() {
		return true;
	}, "MyType");
	assert.equal(`${isT2}`, "TypeChecker<MyType>\nMyType = isFoo");
});

test("Should serialize definitions (string)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker("MyClass");
	assert.equal(`${isT1}`, "TypeChecker<T1>\nT1 = MyClass");
	const isT2 = typeChecker("MyClass", "MyType");
	assert.equal(`${isT2}`, "TypeChecker<MyType>\nMyType = MyClass");
});

test("Should serialize definitions (RegExp)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker(/^[0-9a-f]{4}$/);
	assert.equal(`${isT1}`, "TypeChecker<T1>\nT1 = /^[0-9a-f]{4}$/");
	const isT2 = typeChecker(/^[0-9a-f]{4}$/, "MyType");
	assert.equal(`${isT2}`, "TypeChecker<MyType>\nMyType = /^[0-9a-f]{4}$/");
});

test("Should serialize definitions (Set)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker(new Set(["a", "b", "c"]));
	assert.equal(`${isT1}`, 'TypeChecker<T1>\nT1 = "a" | "b" | "c"');
	const isT2 = typeChecker(new Set(["a", "b", "c"]), "MyType");
	assert.equal(`${isT2}`, 'TypeChecker<MyType>\nMyType = "a" | "b" | "c"');
});

test("Should serialize definitions (Object)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker({ a: /a/ });
	assert.equal(`${isT1}`, "TypeChecker<T1>\nT1 = {\n  a: /a/,\n}");
	const isT2 = typeChecker({ a: /a/ }, "MyType");
	assert.equal(`${isT2}`, "TypeChecker<MyType>\nMyType = {\n  a: /a/,\n}");
});

test("Should serialize definitions (Array)", () => {
	typeCheckerConfig.resetNoNameTypeCount();
	const isT1 = typeChecker({ a: /a/ });
	assert.equal(
		`${isT1.array}`,
		"TypeChecker<T2>\nT2 = Array<T1>\nT1 = {\n  a: /a/,\n}",
	);
	const isT2 = typeChecker({ a: /a/ }, "MyType");
	assert.equal(
		`${isT2.array}`,
		"TypeChecker<T3>\nT3 = Array<MyType>\nMyType = {\n  a: /a/,\n}",
	);
});

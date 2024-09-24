import { describe, test } from "node:test";
import * as assert from "node:assert";
import { typeChecker } from "./typeChecker.ts";

describe(typeChecker.name, () => {
	test("Returns the same object", () => {
		type MyType = "MyType";
		const typeGuard = (input: unknown): input is MyType => input === "MyType";
		const isMyType = typeChecker(typeGuard, "MyType");
		assert.equal(isMyType, typeChecker(isMyType));
	});
});

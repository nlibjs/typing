import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isFunction } from "./Function.ts";

for (const { key, input, expected } of listCheckerTests("Function", "Class")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isFunction(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isFunction } from "./Function.mjs";

for (const { key, input, expected } of listCheckerTests("Function", "Class")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isFunction(input), expected);
	});
}

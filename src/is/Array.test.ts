import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isArray } from "./Array.mjs";

for (const { key, input, expected } of listCheckerTests("EmptyArray")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isArray(input), expected);
	});
}

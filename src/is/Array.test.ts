import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isArray } from "./Array.ts";

for (const { key, input, expected } of listCheckerTests("EmptyArray")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isArray(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isArray } from "./Array.ts";

for (const { key, input, expected } of listCheckerTests("EmptyArray")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isArray(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isValidDate } from "./ValidDate.mjs";

for (const { key, input, expected } of listCheckerTests("ValidDate")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isValidDate(input), expected);
	});
}

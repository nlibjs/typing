import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isValidDate } from "./ValidDate.ts";

for (const { key, input, expected } of listCheckerTests("ValidDate")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isValidDate(input), expected);
	});
}

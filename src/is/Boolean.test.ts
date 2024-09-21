import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isBoolean } from "./Boolean.ts";

for (const { key, input, expected } of listCheckerTests("True", "False")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isBoolean(input), expected);
	});
}

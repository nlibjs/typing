import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isUUIDUppercase } from "./UUIDUppercase.ts";

for (const { key, input, expected } of listCheckerTests("UUIDUppercase")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isUUIDUppercase(input), expected);
	});
}

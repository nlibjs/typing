import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isUUID } from "./UUID.ts";

for (const { key, input, expected } of listCheckerTests("UUID")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isUUID(input), expected);
	});
}

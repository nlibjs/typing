import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isUUIDLowercase } from "./UUIDLowercase.ts";

for (const { key, input, expected } of listCheckerTests("UUIDLowercase")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isUUIDLowercase(input), expected);
	});
}

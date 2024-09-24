import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isUUID } from "./UUID.ts";

for (const { key, input, expected } of listCheckerTests(
	"UUIDLowercase",
	"UUIDUppercase",
	"UUIDMixedcase",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isUUID(input), expected);
	});
}

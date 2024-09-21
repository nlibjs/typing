import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isSmallHexString } from "./SmallHexString.mjs";

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"Digits65",
	"Digits64",
	"SmallHex",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isSmallHexString(input), expected);
	});
}

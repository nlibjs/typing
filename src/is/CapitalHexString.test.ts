import { test } from "node:test";
import * as assert from "node:assert";
import { isCapitalHexString } from "./CapitalHexString.ts";
import { listCheckerTests } from "./tests.private.ts";

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"Digits65",
	"Digits64",
	"CapitalHex",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isCapitalHexString(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isAlphaNumericString } from "./AlphaNumericString.ts";

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"NonEmptyString",
	"SmallLatin",
	"CapitalLatin",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Localhost",
	"Digits64",
	"Digits65",
	"Hex",
	"SmallHex",
	"CapitalHex",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isAlphaNumericString(input), expected);
	});
}

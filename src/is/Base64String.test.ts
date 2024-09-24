import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isBase64String } from "./Base64String.ts";

for (const { key, input, expected } of listCheckerTests(
	"Base64",
	"CapitalLatin",
	"SmallLatin",
	"Digits65",
	"Digits64",
	"Localhost",
	"NonEmptyString",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Hex",
	"SmallHex",
	"CapitalHex",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isBase64String(input), expected);
	});
}

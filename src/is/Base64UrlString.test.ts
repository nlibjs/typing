import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isBase64UrlString } from "./Base64UrlString.ts";

for (const { key, input, expected } of listCheckerTests(
	"Base64Url",
	"CapitalLatin",
	"SmallLatin",
	"Digits65",
	"Digits64",
	"Localhost",
	"NonEmptyString",
	"UUIDLowercase",
	"UUIDUppercase",
	"UUIDMixedcase",
	"NonUUID",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Hex",
	"SmallHex",
	"CapitalHex",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isBase64UrlString(input), expected);
	});
}

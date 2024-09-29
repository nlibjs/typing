import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isBase64UrlString } from "./Base64UrlString.ts";

for (const { name, input, expected } of checkerTestCase(
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
	test(`${name} → ${expected}`, () => {
		assert.equal(isBase64UrlString(input), expected);
	});
}

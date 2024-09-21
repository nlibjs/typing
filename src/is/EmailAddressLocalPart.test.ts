import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isEmailAddressLocalPart } from "./EmailAddressLocalPart.ts";

for (const { key, input, expected } of listCheckerTests(
	"NonEmptyString",
	"UUIDLowercase",
	"UUIDUppercase",
	"UUIDMixedcase",
	"NonUUID",
	"Localhost",
	"ExampleDotCom",
	"DomainWithHyphenAndDigits",
	"DomainStartsWithDigits",
	"InvalidDomainEndsWithHyphen",
	"Digits64",
	"DigitsSeparatedByDot",
	"EmailAddressLocalPartSymbols",
	"SmallLatin",
	"CapitalLatin",
	"QuotedSingle",
	"IPv4",
	"InvalidIPv4",
	"Base64",
	"Base64Url",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Hex",
	"SmallHex",
	"CapitalHex",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isEmailAddressLocalPart(input), expected);
	});
}

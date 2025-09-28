import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isEmailAddressLocalPart } from "./EmailAddressLocalPart.ts";

for (const { name, input, expected } of checkerTestCase(
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
	test(`${name} → ${expected}`, () => {
		assert.equal(isEmailAddressLocalPart(input), expected);
	});
}

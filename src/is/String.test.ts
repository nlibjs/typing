import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isString } from "./String.ts";

for (const { name, input, expected } of checkerTestCase(
	"EmptyString",
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
	"InvalidDomainStartsWithDot",
	"InvalidDomainEndsWithDot",
	"Digits64",
	"Digits65",
	"DigitsSeparatedByDot",
	"DigitsSeparatedBy2Dots",
	"EmailAddressLocalPartSymbols",
	"SmallLatin",
	"CapitalLatin",
	"QuotedSingle",
	"QuotedDouble",
	"EmailAddressNoLocalPart",
	"EmailAddress1LocalPart",
	"EmailAddressLong64",
	"EmailAddressLong65",
	"EmailAddressSymbols",
	"IPv4",
	"IPv6",
	"InvalidIPv4",
	"InvalidIPv6",
	"HttpsUrl",
	"HttpsUrlWithPort",
	"HostWithPort",
	"IPv4",
	"HostIPv6",
	"HostIPv6WithPort",
	"InvalidHttpsUrl",
	"HttpUrl",
	"InvalidHttpUrl",
	"Base64",
	"Base64Url",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Hex",
	"SmallHex",
	"CapitalHex",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isString(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isUrlHostString } from "./UrlHostString.ts";

for (const { name, input, expected } of checkerTestCase(
	"ExampleDotCom",
	"DomainWithHyphenAndDigits",
	"DomainStartsWithDigits",
	"HostWithPort",
	"IPv4",
	"HostIPv6",
	"HostIPv6WithPort",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isUrlHostString(input), expected);
	});
}

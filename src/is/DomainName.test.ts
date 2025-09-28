import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isDomainName } from "./DomainName.ts";

for (const { name, input, expected } of checkerTestCase(
	"ExampleDotCom",
	"DomainWithHyphenAndDigits",
	"DomainStartsWithDigits",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isDomainName(input), expected);
	});
}

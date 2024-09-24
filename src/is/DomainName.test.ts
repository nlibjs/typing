import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isDomainName } from "./DomainName.ts";

for (const { key, input, expected } of listCheckerTests(
	"ExampleDotCom",
	"DomainWithHyphenAndDigits",
	"DomainStartsWithDigits",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isDomainName(input), expected);
	});
}

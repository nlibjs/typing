import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isDomainName } from "./DomainName.mjs";

for (const { key, input, expected } of listCheckerTests(
	"ExampleDotCom",
	"DomainWithHyphenAndDigits",
	"DomainStartsWithDigits",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isDomainName(input), expected);
	});
}

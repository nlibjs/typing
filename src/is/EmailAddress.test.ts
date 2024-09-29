import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isEmailAddress } from "./EmailAddress.ts";

for (const { name, input, expected } of checkerTestCase(
	"EmailAddress1LocalPart",
	"EmailAddressLong64",
	"EmailAddressSymbols",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isEmailAddress(input), expected);
	});
}

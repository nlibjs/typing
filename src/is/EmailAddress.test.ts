import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isEmailAddress } from "./EmailAddress.mjs";

for (const { key, input, expected } of listCheckerTests(
	"EmailAddress1LocalPart",
	"EmailAddressLong64",
	"EmailAddressSymbols",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isEmailAddress(input), expected);
	});
}

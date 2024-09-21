import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isNumberString } from "./NumberString.ts";

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"Digits65",
	"Digits64",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNumberString(input), expected);
	});
}

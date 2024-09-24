import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isNonNegativeSafeInteger } from "./NonNegativeSafeInteger.ts";

for (const { key, input, expected } of listCheckerTests(
	"NegativeZero",
	"PositiveZero",
	"Zero",
	"PositiveInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNonNegativeSafeInteger(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isNonNegativeFiniteNumber } from "./NonNegativeFiniteNumber.ts";

for (const { key, input, expected } of listCheckerTests(
	"NegativeZero",
	"PositiveZero",
	"Zero",
	"PositiveInteger",
	"PositiveFloat",
	"PositiveUnsafeInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNonNegativeFiniteNumber(input), expected);
	});
}

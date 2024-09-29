import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNonNegativeFiniteNumber } from "./NonNegativeFiniteNumber.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeZero",
	"PositiveZero",
	"Zero",
	"PositiveInteger",
	"PositiveFloat",
	"PositiveUnsafeInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNonNegativeFiniteNumber(input), expected);
	});
}

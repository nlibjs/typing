import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNonNegativeSafeInteger } from "./NonNegativeSafeInteger.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeZero",
	"PositiveZero",
	"Zero",
	"PositiveInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNonNegativeSafeInteger(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeUnsafeInteger",
	"NegativeFloat",
	"NegativeInteger",
	"NegativeZero",
	"Zero",
	"PositiveZero",
	"PositiveInteger",
	"PositiveFloat",
	"PositiveUnsafeInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isFiniteNumber(input), expected);
	});
}

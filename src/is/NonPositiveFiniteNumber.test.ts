import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNonPositiveFiniteNumber } from "./NonPositiveFiniteNumber.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeZero",
	"PositiveZero",
	"Zero",
	"NegativeInteger",
	"NegativeFloat",
	"NegativeUnsafeInteger",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNonPositiveFiniteNumber(input), expected);
	});
}

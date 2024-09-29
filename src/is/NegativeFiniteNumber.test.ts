import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNegativeFiniteNumber } from "./NegativeFiniteNumber.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeInteger",
	"NegativeUnsafeInteger",
	"NegativeFloat",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNegativeFiniteNumber(input), expected);
	});
}

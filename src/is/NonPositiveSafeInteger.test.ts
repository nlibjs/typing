import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNonPositiveSafeInteger } from "./NonPositiveSafeInteger.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeZero",
	"PositiveZero",
	"Zero",
	"NegativeInteger",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNonPositiveSafeInteger(input), expected);
	});
}

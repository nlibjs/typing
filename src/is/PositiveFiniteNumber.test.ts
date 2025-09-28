import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isPositiveFiniteNumber } from "./PositiveFiniteNumber.ts";

for (const { name, input, expected } of checkerTestCase(
	"PositiveInteger",
	"PositiveUnsafeInteger",
	"PositiveFloat",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isPositiveFiniteNumber(input), expected);
	});
}

import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isSafeInteger } from "./SafeInteger.ts";

for (const { name, input, expected } of checkerTestCase(
	"NegativeInteger",
	"PositiveInteger",
	"NegativeZero",
	"Zero",
	"PositiveZero",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isSafeInteger(input), expected);
	});
}

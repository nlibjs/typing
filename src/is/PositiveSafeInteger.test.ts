import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isPositiveSafeInteger } from "./PositiveSafeInteger.ts";

for (const { name, input, expected } of checkerTestCase(
	"PositiveInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isPositiveSafeInteger(input), expected);
	});
}

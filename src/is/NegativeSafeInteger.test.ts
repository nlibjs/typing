import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNegativeSafeInteger } from "./NegativeSafeInteger.ts";

for (const { name, input, expected } of checkerTestCase("NegativeInteger")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNegativeSafeInteger(input), expected);
	});
}

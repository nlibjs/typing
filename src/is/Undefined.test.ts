import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isUndefined } from "./Undefined.ts";

for (const { name, input, expected } of checkerTestCase("Undefined")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isUndefined(input), expected);
	});
}

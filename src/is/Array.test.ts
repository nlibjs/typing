import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isArray } from "./Array.ts";

for (const { name, input, expected } of checkerTestCase("EmptyArray")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isArray(input), expected);
	});
}

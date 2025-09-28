import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isFunction } from "./Function.ts";

for (const { name, input, expected } of checkerTestCase("Function", "Class")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isFunction(input), expected);
	});
}

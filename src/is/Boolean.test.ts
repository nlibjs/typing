import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isBoolean } from "./Boolean.ts";

for (const { name, input, expected } of checkerTestCase("True", "False")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isBoolean(input), expected);
	});
}

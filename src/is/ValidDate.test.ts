import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isValidDate } from "./ValidDate.ts";

for (const { name, input, expected } of checkerTestCase("ValidDate")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isValidDate(input), expected);
	});
}

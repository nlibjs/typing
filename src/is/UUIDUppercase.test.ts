import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isUUIDUppercase } from "./UUIDUppercase.ts";

for (const { name, input, expected } of checkerTestCase("UUIDUppercase")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isUUIDUppercase(input), expected);
	});
}

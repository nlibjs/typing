import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isUUIDLowercase } from "./UUIDLowercase.ts";

for (const { name, input, expected } of checkerTestCase("UUIDLowercase")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isUUIDLowercase(input), expected);
	});
}

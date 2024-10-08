import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNull } from "./Null.ts";

for (const { name, input, expected } of checkerTestCase("Null")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNull(input), expected);
	});
}

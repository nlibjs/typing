import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isNever } from "./Never.ts";

for (const { name, input, expected } of checkerTestCase()) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isNever(input), expected);
	});
}

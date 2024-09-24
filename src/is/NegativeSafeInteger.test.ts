import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isNegativeSafeInteger } from "./NegativeSafeInteger.ts";

for (const { key, input, expected } of listCheckerTests("NegativeInteger")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNegativeSafeInteger(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isNegativeSafeInteger } from "./NegativeSafeInteger.ts";

for (const { key, input, expected } of listCheckerTests("NegativeInteger")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNegativeSafeInteger(input), expected);
	});
}

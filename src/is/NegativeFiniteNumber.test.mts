import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isNegativeFiniteNumber } from "./NegativeFiniteNumber.mjs";

for (const { key, input, expected } of listCheckerTests(
	"NegativeInteger",
	"NegativeUnsafeInteger",
	"NegativeFloat",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNegativeFiniteNumber(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isNegativeFiniteNumber } from "./NegativeFiniteNumber.ts";

for (const { key, input, expected } of listCheckerTests(
	"NegativeInteger",
	"NegativeUnsafeInteger",
	"NegativeFloat",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNegativeFiniteNumber(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

for (const { key, input, expected } of listCheckerTests(
	"NegativeUnsafeInteger",
	"NegativeFloat",
	"NegativeInteger",
	"NegativeZero",
	"Zero",
	"PositiveZero",
	"PositiveInteger",
	"PositiveFloat",
	"PositiveUnsafeInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isFiniteNumber(input), expected);
	});
}

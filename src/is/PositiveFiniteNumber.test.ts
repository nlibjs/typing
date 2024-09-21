import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isPositiveFiniteNumber } from "./PositiveFiniteNumber.ts";

for (const { key, input, expected } of listCheckerTests(
	"PositiveInteger",
	"PositiveUnsafeInteger",
	"PositiveFloat",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isPositiveFiniteNumber(input), expected);
	});
}

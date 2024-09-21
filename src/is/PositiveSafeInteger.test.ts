import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isPositiveSafeInteger } from "./PositiveSafeInteger.mjs";

for (const { key, input, expected } of listCheckerTests(
	"PositiveInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isPositiveSafeInteger(input), expected);
	});
}

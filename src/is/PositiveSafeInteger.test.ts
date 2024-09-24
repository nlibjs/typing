import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isPositiveSafeInteger } from "./PositiveSafeInteger.ts";

for (const { key, input, expected } of listCheckerTests(
	"PositiveInteger",
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isPositiveSafeInteger(input), expected);
	});
}

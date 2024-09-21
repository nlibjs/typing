import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isLatinString } from "./LatinString.ts";

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"NonEmptyString",
	"SmallLatin",
	"CapitalLatin",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Localhost",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isLatinString(input), expected);
	});
}

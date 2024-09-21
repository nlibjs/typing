import { test } from "node:test";
import * as assert from "node:assert";
import {
	CapitalLatinCharacters,
	isCapitalLatinString,
} from "./CapitalLatinString.ts";
import { listCheckerTests } from "./tests.private.ts";

test("CapitalLatinCharacters", () => {
	assert.equal(isCapitalLatinString(CapitalLatinCharacters), true);
});

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"CapitalLatin",
	"HttpMethodGet",
	"HttpMethodOptions",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isCapitalLatinString(input), expected);
	});
}

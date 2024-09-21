import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import {
	isSmallLatinString,
	SmallLatinCharacters,
} from "./SmallLatinString.mjs";

test("SmallLatinCharacters", () => {
	assert.equal(isSmallLatinString(SmallLatinCharacters), true);
});

for (const { key, input, expected } of listCheckerTests(
	"EmptyString",
	"NonEmptyString",
	"SmallLatin",
	"Localhost",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isSmallLatinString(input), expected);
	});
}

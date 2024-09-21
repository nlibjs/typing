import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import {
	isSmallLatinString,
	SmallLatinCharacters,
} from "./SmallLatinString.ts";

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

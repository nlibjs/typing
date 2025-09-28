import * as assert from "node:assert";
import { test } from "node:test";
import {
	DIGIT_ONE,
	DIGIT_ZERO,
	LATIN_CAPITAL_LETTER_A,
	LATIN_SMALL_LETTER_A,
	LATIN_SMALL_LETTER_Z,
	SPACE,
} from "./codePoints.ts";
import { listCodePoints, toSmallLatinCodePoint } from "./codePointUtil.ts";

{
	const tests: Array<[number, number]> = [
		[DIGIT_ONE, DIGIT_ONE],
		[LATIN_CAPITAL_LETTER_A, LATIN_SMALL_LETTER_A],
		[LATIN_SMALL_LETTER_Z, LATIN_SMALL_LETTER_Z],
	];
	for (const [input, expected] of tests) {
		test(`${input} → ${expected}`, () => {
			assert.equal(toSmallLatinCodePoint(input), expected);
		});
	}
}

{
	const tests: Array<[string, Array<number>]> = [
		["", []],
		["aA 0", [LATIN_SMALL_LETTER_A, LATIN_CAPITAL_LETTER_A, SPACE, DIGIT_ZERO]],
		["𠮟る𩸽😭", [0x20b9f, 0x308b, 0x29e3d, 0x1f62d]],
	];
	for (const [input, expected] of tests) {
		test(`${input} → ${expected.join(",")}`, () => {
			const generator = listCodePoints(input);
			for (const value of expected) {
				assert.deepStrictEqual(generator.next(), { done: false, value });
			}
			assert.deepStrictEqual(generator.next(), {
				done: true,
				value: undefined,
			});
		});
	}
}

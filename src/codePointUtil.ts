import {
	DIGIT_NINE,
	DIGIT_ONE,
	DIGIT_ZERO,
	LATIN_CAPITAL_LETTER_A,
	LATIN_CAPITAL_LETTER_F,
	LATIN_CAPITAL_LETTER_Z,
	LATIN_SMALL_LETTER_A,
	LATIN_SMALL_LETTER_F,
	LATIN_SMALL_LETTER_Z,
} from "./codePoints.ts";

/**
 * Converts a capital Latin code point to a small Latin code point.
 * If the input is not a capital Latin code point, it returns the input unchanged.
 * @param codePoint - The code point to convert.
 * @returns The converted code point.
 */
export const toSmallLatinCodePoint = (codePoint: number): number =>
	LATIN_CAPITAL_LETTER_A <= codePoint && codePoint <= LATIN_CAPITAL_LETTER_Z
		? codePoint + 0x20
		: codePoint;

/**
 * Returns true if the code point is a capital Latin letter.
 * @param codePoint - The code point to check.
 * @returns True if the code point is a capital Latin letter, false otherwise.
 */
export const isCapitalLatinCodePoint = (codePoint: number): boolean =>
	LATIN_CAPITAL_LETTER_A <= codePoint && codePoint <= LATIN_CAPITAL_LETTER_Z;

/**
 * Returns true if the code point is a small Latin letter.
 * @param codePoint - The code point to check.
 * @returns True if the code point is a small Latin letter, false otherwise.
 */
export const isSmallLatinCodePoint = (codePoint: number): boolean =>
	LATIN_SMALL_LETTER_A <= codePoint && codePoint <= LATIN_SMALL_LETTER_Z;

/**
 * Returns true if the code point is a non-zero digit.
 * @param codePoint - The code point to check.
 * @returns True if the code point is a non-zero digit, false otherwise.
 */
export const isNonZeroDigitCodePoint = (codePoint: number): boolean =>
	DIGIT_ONE <= codePoint && codePoint <= DIGIT_NINE;

/**
 * Returns true if the code point is a digit.
 * @param codePoint - The code point to check.
 * @returns True if the code point is a digit, false otherwise.
 */
export const isDigitCodePoint = (codePoint: number): boolean =>
	DIGIT_ZERO <= codePoint && codePoint <= DIGIT_NINE;

/**
 * Returns true if the code point is a capital hexadecimal Latin letter (A-F).
 * @param codePoint - The code point to check.
 * @returns True if the code point is a capital hexadecimal Latin letter, false otherwise.
 */
export const isCapitalHexLatinCodePoint = (codePoint: number): boolean =>
	LATIN_CAPITAL_LETTER_A <= codePoint && codePoint <= LATIN_CAPITAL_LETTER_F;

/**
 * Returns true if the code point is a small hexadecimal Latin letter (a-f).
 * @param codePoint - The code point to check.
 * @returns True if the code point is a small hexadecimal Latin letter, false otherwise.
 */
export const isSmallHexLatinCodePoint = (codePoint: number): boolean =>
	LATIN_SMALL_LETTER_A <= codePoint && codePoint <= LATIN_SMALL_LETTER_F;

/**
 * Returns true if the code point is a capital hexadecimal digit (0-9, A-F).
 * @param codePoint - The code point to check.
 * @returns True if the code point is a capital hexadecimal digit, false otherwise.
 */
export const isCapitalHexCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) || isCapitalHexLatinCodePoint(codePoint);

/**
 * Returns true if the code point is a small hexadecimal digit (0-9, a-f).
 * @param codePoint - The code point to check.
 * @returns True if the code point is a small hexadecimal digit, false otherwise.
 */
export const isSmallHexCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) || isSmallHexLatinCodePoint(codePoint);

/**
 * Returns true if the code point is a hexadecimal digit (0-9, A-F, a-f).
 * @param codePoint - The code point to check.
 * @returns True if the code point is a hexadecimal digit, false otherwise.
 */
export const isHexCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) ||
	isCapitalHexLatinCodePoint(codePoint) ||
	isSmallHexLatinCodePoint(codePoint);

/**
 * Returns true if the code point is an alphanumeric character (0-9, A-Z, a-z).
 * @param codePoint - The code point to check.
 * @returns True if the code point is an alphanumeric character, false otherwise.
 */
export const isAlphaNumericCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) ||
	isCapitalLatinCodePoint(codePoint) ||
	isSmallLatinCodePoint(codePoint);

/**
 * Returns true if the code point is a leading surrogate (U+D800 to U+DBFF).
 * @param x - The code point to check.
 * @returns True if the code point is a leading surrogate, false otherwise.
 */
export const isLeadingSurrogateCodePoint = (x: number): boolean =>
	0xd800 <= x && x <= 0xdbff;

/**
 * Returns true if the code point is a trailing surrogate (U+DC00 to U+DFFF).
 * @param x - The code point to check.
 * @returns True if the code point is a trailing surrogate, false otherwise.
 */
export const isTrailingSurrogateCodePoint = (x: number): boolean =>
	0xdc00 <= x && x <= 0xdfff;

/**
 * Returns true if the code point is a surrogate (U+D800 to U+DFFF).
 * @param x - The code point to check.
 * @returns True if the code point is a surrogate, false otherwise.
 */
export const isSurrogateCodePoint = (x: number): boolean =>
	0xd800 <= x && x <= 0xdfff;

/**
 * Generates code points from a string starting from a given index.
 * @param input - The string to generate code points from.
 * @param fromIndex - The index to start from (default is 0).
 * @returns A generator yielding code points.
 */
export const listCodePoints = function* (
	input: string,
	fromIndex = 0,
): Generator<number> {
	const { length } = input;
	for (let index = fromIndex; index < length; index++) {
		const codePoint = input.codePointAt(index);
		if (typeof codePoint !== "number") {
			break;
		}
		if (0xffff < codePoint) {
			index++;
		}
		yield codePoint;
	}
};

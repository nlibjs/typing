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

export const toSmallLatinCodePoint = (codePoint: number): number =>
	LATIN_CAPITAL_LETTER_A <= codePoint && codePoint <= LATIN_CAPITAL_LETTER_Z
		? codePoint + 0x20
		: codePoint;

export const isCapitalLatinCodePoint = (codePoint: number): boolean =>
	LATIN_CAPITAL_LETTER_A <= codePoint && codePoint <= LATIN_CAPITAL_LETTER_Z;

export const isSmallLatinCodePoint = (codePoint: number): boolean =>
	LATIN_SMALL_LETTER_A <= codePoint && codePoint <= LATIN_SMALL_LETTER_Z;

export const isNonZeroDigitCodePoint = (codePoint: number): boolean =>
	DIGIT_ONE <= codePoint && codePoint <= DIGIT_NINE;

export const isDigitCodePoint = (codePoint: number): boolean =>
	DIGIT_ZERO <= codePoint && codePoint <= DIGIT_NINE;

export const isCapitalHexLatinCodePoint = (codePoint: number): boolean =>
	LATIN_CAPITAL_LETTER_A <= codePoint && codePoint <= LATIN_CAPITAL_LETTER_F;

export const isSmallHexLatinCodePoint = (codePoint: number): boolean =>
	LATIN_SMALL_LETTER_A <= codePoint && codePoint <= LATIN_SMALL_LETTER_F;

export const isCapitalHexCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) || isCapitalHexLatinCodePoint(codePoint);

export const isSmallHexCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) || isSmallHexLatinCodePoint(codePoint);

export const isHexCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) ||
	isCapitalHexLatinCodePoint(codePoint) ||
	isSmallHexLatinCodePoint(codePoint);

export const isAlphaNumericCodePoint = (codePoint: number): boolean =>
	isDigitCodePoint(codePoint) ||
	isCapitalLatinCodePoint(codePoint) ||
	isSmallLatinCodePoint(codePoint);

/** A leading surrogate is a code point that is in the range U+D800 to U+DBFF, inclusive. */
export const isLeadingSurrogateCodePoint = (x: number): boolean =>
	0xd800 <= x && x <= 0xdbff;
/** A trailing surrogate is a code point that is in the range U+DC00 to U+DFFF, inclusive. */
export const isTrailingSurrogateCodePoint = (x: number): boolean =>
	0xdc00 <= x && x <= 0xdfff;
/** A surrogate is a code point that is in the range U+D800 to U+DFFF, inclusive. */
export const isSurrogateCodePoint = (x: number): boolean =>
	0xd800 <= x && x <= 0xdfff;

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

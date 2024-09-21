/**
 * This module provides constants and functions for working with Unicode code points.
 * @module
 */
export const NULL = 0x0000;
export const START_OF_HEADING = 0x0001;
export const START_OF_TEXT = 0x0002;
export const END_OF_TEXT = 0x0003;
export const END_OF_TRANSMISSION = 0x0004;
export const ENQUIRY = 0x0005;
export const ACKNOWLEDGE = 0x0006;
export const ALERT = 0x0007;
export const BACKSPACE = 0x0008;
export const CHARACTER_TABULATION = 0x0009;
export const LINE_FEED = 0x000a;
export const LINE_TABULATION = 0x000b;
export const FORM_FEED = 0x000c;
export const CARRIAGE_RETURN = 0x000d;
export const SHIFT_OUT = 0x000e;
export const SHIFT_IN = 0x000f;
export const DATA_LINK_ESCAPE = 0x0010;
export const DEVICE_CONTROL_ONE = 0x0011;
export const DEVICE_CONTROL_TWO = 0x0012;
export const DEVICE_CONTROL_THREE = 0x0013;
export const DEVICE_CONTROL_FOUR = 0x0014;
export const NEGATIVE_ACKNOWLEDGE = 0x0015;
export const SYNCHRONOUS_IDLE = 0x0016;
export const END_OF_TRANSMISSION_BLOCK = 0x0017;
export const CANCEL = 0x0018;
export const END_OF_MEDIUM = 0x0019;
export const SUBSTITUTE = 0x001a;
export const ESCAPE = 0x001b;
export const INFORMATION_SEPARATOR_FOUR = 0x001c;
export const INFORMATION_SEPARATOR_THREE = 0x001d;
export const INFORMATION_SEPARATOR_TWO = 0x001e;
export const INFORMATION_SEPARATOR_ONE = 0x001f;
export const SPACE = 0x0020;
export const EXCLAMATION_MARK = 0x0021;
export const QUOTATION_MARK = 0x0022;
export const NUMBER_SIGN = 0x0023;
export const DOLLAR_SIGN = 0x0024;
export const PERCENT_SIGN = 0x0025;
export const AMPERSAND = 0x0026;
export const APOSTROPHE = 0x0027;
export const LEFT_PARENTHESIS = 0x0028;
export const RIGHT_PARENTHESIS = 0x0029;
export const ASTERISK = 0x002a;
export const PLUS_SIGN = 0x002b;
export const COMMA = 0x002c;
export const HYPHEN_MINUS = 0x002d;
export const FULL_STOP = 0x002e;
export const SOLIDUS = 0x002f;
export const DIGIT_ZERO = 0x0030;
export const DIGIT_ONE = 0x0031;
export const DIGIT_TWO = 0x0032;
export const DIGIT_THREE = 0x0033;
export const DIGIT_FOUR = 0x0034;
export const DIGIT_FIVE = 0x0035;
export const DIGIT_SIX = 0x0036;
export const DIGIT_SEVEN = 0x0037;
export const DIGIT_EIGHT = 0x0038;
export const DIGIT_NINE = 0x0039;
export const COLON = 0x003a;
export const SEMICOLON = 0x003b;
export const LESS_THAN_SIGN = 0x003c;
export const EQUALS_SIGN = 0x003d;
export const GREATER_THAN_SIGN = 0x003e;
export const QUESTION_MARK = 0x003f;
export const COMMERCIAL_AT = 0x0040;
export const LATIN_CAPITAL_LETTER_A = 0x0041;
export const LATIN_CAPITAL_LETTER_B = 0x0042;
export const LATIN_CAPITAL_LETTER_C = 0x0043;
export const LATIN_CAPITAL_LETTER_D = 0x0044;
export const LATIN_CAPITAL_LETTER_E = 0x0045;
export const LATIN_CAPITAL_LETTER_F = 0x0046;
export const LATIN_CAPITAL_LETTER_G = 0x0047;
export const LATIN_CAPITAL_LETTER_H = 0x0048;
export const LATIN_CAPITAL_LETTER_I = 0x0049;
export const LATIN_CAPITAL_LETTER_J = 0x004a;
export const LATIN_CAPITAL_LETTER_K = 0x004b;
export const LATIN_CAPITAL_LETTER_L = 0x004c;
export const LATIN_CAPITAL_LETTER_M = 0x004d;
export const LATIN_CAPITAL_LETTER_N = 0x004e;
export const LATIN_CAPITAL_LETTER_O = 0x004f;
export const LATIN_CAPITAL_LETTER_P = 0x0050;
export const LATIN_CAPITAL_LETTER_Q = 0x0051;
export const LATIN_CAPITAL_LETTER_R = 0x0052;
export const LATIN_CAPITAL_LETTER_S = 0x0053;
export const LATIN_CAPITAL_LETTER_T = 0x0054;
export const LATIN_CAPITAL_LETTER_U = 0x0055;
export const LATIN_CAPITAL_LETTER_V = 0x0056;
export const LATIN_CAPITAL_LETTER_W = 0x0057;
export const LATIN_CAPITAL_LETTER_X = 0x0058;
export const LATIN_CAPITAL_LETTER_Y = 0x0059;
export const LATIN_CAPITAL_LETTER_Z = 0x005a;
export const LEFT_SQUARE_BRACKET = 0x005b;
export const REVERSE_SOLIDUS = 0x005c;
export const RIGHT_SQUARE_BRACKET = 0x005d;
export const CIRCUMFLEX_ACCENT = 0x005e;
export const LOW_LINE = 0x005f;
export const GRAVE_ACCENT = 0x0060;
export const LATIN_SMALL_LETTER_A = 0x0061;
export const LATIN_SMALL_LETTER_B = 0x0062;
export const LATIN_SMALL_LETTER_C = 0x0063;
export const LATIN_SMALL_LETTER_D = 0x0064;
export const LATIN_SMALL_LETTER_E = 0x0065;
export const LATIN_SMALL_LETTER_F = 0x0066;
export const LATIN_SMALL_LETTER_G = 0x0067;
export const LATIN_SMALL_LETTER_H = 0x0068;
export const LATIN_SMALL_LETTER_I = 0x0069;
export const LATIN_SMALL_LETTER_J = 0x006a;
export const LATIN_SMALL_LETTER_K = 0x006b;
export const LATIN_SMALL_LETTER_L = 0x006c;
export const LATIN_SMALL_LETTER_M = 0x006d;
export const LATIN_SMALL_LETTER_N = 0x006e;
export const LATIN_SMALL_LETTER_O = 0x006f;
export const LATIN_SMALL_LETTER_P = 0x0070;
export const LATIN_SMALL_LETTER_Q = 0x0071;
export const LATIN_SMALL_LETTER_R = 0x0072;
export const LATIN_SMALL_LETTER_S = 0x0073;
export const LATIN_SMALL_LETTER_T = 0x0074;
export const LATIN_SMALL_LETTER_U = 0x0075;
export const LATIN_SMALL_LETTER_V = 0x0076;
export const LATIN_SMALL_LETTER_W = 0x0077;
export const LATIN_SMALL_LETTER_X = 0x0078;
export const LATIN_SMALL_LETTER_Y = 0x0079;
export const LATIN_SMALL_LETTER_Z = 0x007a;
export const LEFT_CURLY_BRACKET = 0x007b;
export const VERTICAL_LINE = 0x007c;
export const RIGHT_CURLY_BRACKET = 0x007d;
export const TILDE = 0x007e;
export const DELETE = 0x007f;

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
		let codeUnit = input.charCodeAt(index);
		if (isSurrogateCodePoint(codeUnit)) {
			const nextCodeUnit = input.charCodeAt(index + 1);
			if (
				isLeadingSurrogateCodePoint(codeUnit) &&
				isTrailingSurrogateCodePoint(nextCodeUnit)
			) {
				codeUnit =
					(codeUnit - 0xd800) * 0x400 + (nextCodeUnit - 0xdc00) + 0x10000;
				index += 1;
			}
		}
		yield codeUnit;
	}
};

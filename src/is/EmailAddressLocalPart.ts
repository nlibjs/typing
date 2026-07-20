import {
	AMPERSAND,
	APOSTROPHE,
	ASTERISK,
	CIRCUMFLEX_ACCENT,
	DOLLAR_SIGN,
	EQUALS_SIGN,
	EXCLAMATION_MARK,
	FULL_STOP,
	GRAVE_ACCENT,
	HYPHEN_MINUS,
	LEFT_CURLY_BRACKET,
	LOW_LINE,
	NUMBER_SIGN,
	PERCENT_SIGN,
	PLUS_SIGN,
	QUESTION_MARK,
	RIGHT_CURLY_BRACKET,
	SOLIDUS,
	TILDE,
	VERTICAL_LINE,
} from "../codePoints.ts";
import {
	isCapitalLatinCodePoint,
	isDigitCodePoint,
	isSmallLatinCodePoint,
	listCodePoints,
} from "../codePointUtil.ts";
import { fromDiagnosis, narrow } from "../narrow.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isString } from "./String.ts";

const allowedNonAlphaNumerics = new Set([
	EXCLAMATION_MARK,
	NUMBER_SIGN,
	DOLLAR_SIGN,
	PERCENT_SIGN,
	AMPERSAND,
	APOSTROPHE,
	ASTERISK,
	PLUS_SIGN,
	HYPHEN_MINUS,
	SOLIDUS,
	EQUALS_SIGN,
	QUESTION_MARK,
	CIRCUMFLEX_ACCENT,
	LOW_LINE,
	GRAVE_ACCENT,
	LEFT_CURLY_BRACKET,
	VERTICAL_LINE,
	RIGHT_CURLY_BRACKET,
	TILDE,
]);

const isAtomText = (codePoint: number): boolean =>
	isSmallLatinCodePoint(codePoint) ||
	isCapitalLatinCodePoint(codePoint) ||
	isDigitCodePoint(codePoint) ||
	allowedNonAlphaNumerics.has(codePoint);

const localPartExpected =
	"an email address local part of 1 to 64 valid characters";

/**
 * - https://www.rfc-editor.org/rfc/rfc5322.html#section-3.4.1
 * - https://gitlab-ce.zipang.in/everholic/monorepo/-/issues/36
 * ```abnf
 * local-part  = 1*atext *("." 1*atext)
 * atext       = ALPHA / DIGIT / "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" /
 *               "-" / "/" / "=" / "?" / "^" / "_" / "`" / "{" / "|" / "}" / "~"
 * ```
 * @param input A value to check.
 * @returns A type predicate for string that is a local part of an email address.
 */
function* diagnoseEmailAddressLocalPart(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	const { length } = input;
	if (length === 0 || 64 < length) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: localPartExpected,
		};
		return;
	}
	let lastCodePoint = FULL_STOP;
	for (const codePoint of listCodePoints(input)) {
		if (codePoint === FULL_STOP) {
			if (lastCodePoint === FULL_STOP) {
				yield returnIssue ?? {
					code: ValidationIssueCode.NarrowingFailed,
					expected: localPartExpected,
				};
				return;
			}
		} else if (!isAtomText(codePoint)) {
			yield returnIssue ?? {
				code: ValidationIssueCode.NarrowingFailed,
				expected: localPartExpected,
			};
			return;
		}
		lastCodePoint = codePoint;
	}
	if (lastCodePoint === FULL_STOP) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: localPartExpected,
		};
	}
}

export const isEmailAddressLocalPart: TypeChecker<string> = typeChecker(
	narrow(
		isString,
		fromDiagnosis<string, string>(diagnoseEmailAddressLocalPart),
	),
	"EmailAddressLocalPart",
);

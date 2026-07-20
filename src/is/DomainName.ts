import { FULL_STOP, HYPHEN_MINUS } from "../codePoints.ts";
import {
	isDigitCodePoint,
	isSmallLatinCodePoint,
	listCodePoints,
} from "../codePointUtil.ts";
import { fromDiagnosis, narrow } from "../narrow.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, Nominal, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isString } from "./String.ts";

/**
 * - https://www.rfc-editor.org/rfc/rfc5322.html#section-3.4.1
 * - https://gitlab-ce.zipang.in/everholic/monorepo/-/issues/36
 * ```abnf
 * domain      = label *("." label)
 * label       = ALPHA [[lgh-str] let-dig]
 * lgh-str     = 1*let-dig-hyp
 * let-dig-hyp = let-dig / "-"
 * let-dig     = ALPHA / DIGIT
 * ```
 */
export type DomainName = Nominal<string, "DomainName">;

/**
 * @param input A value to check.
 * @returns A type predicate for `DomainName`.
 */
function* diagnoseDomainName(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	/** Initialize with a hyphen so `.example.com` is rejected. */
	let lastCodePoint = HYPHEN_MINUS;
	let currentLabelIsValid = false;
	let labelCount = 1;
	for (const codePoint of listCodePoints(input)) {
		if (codePoint === FULL_STOP) {
			if (!currentLabelIsValid || lastCodePoint === HYPHEN_MINUS) {
				yield returnIssue ?? {
					code: ValidationIssueCode.NarrowingFailed,
					expected: "a domain name with at least two valid labels",
				};
				return;
			}
			currentLabelIsValid = false;
			labelCount += 1;
		} else if (isSmallLatinCodePoint(codePoint)) {
			currentLabelIsValid = true;
		} else if (codePoint !== HYPHEN_MINUS && !isDigitCodePoint(codePoint)) {
			yield returnIssue ?? {
				code: ValidationIssueCode.NarrowingFailed,
				expected: "a domain name with at least two valid labels",
			};
			return;
		}
		lastCodePoint = codePoint;
	}
	if (
		lastCodePoint === FULL_STOP ||
		lastCodePoint === HYPHEN_MINUS ||
		labelCount <= 1
	) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: "a domain name with at least two valid labels",
		};
	}
}

export const isDomainName: TypeChecker<DomainName> = typeChecker(
	narrow(isString, fromDiagnosis<string, DomainName>(diagnoseDomainName)),
	"DomainName",
);

import { FULL_STOP, HYPHEN_MINUS } from "../codePoints.ts";
import {
	isDigitCodePoint,
	isSmallLatinCodePoint,
	listCodePoints,
} from "../codePointUtil.ts";
import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
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
export const isDomainName: TypeChecker<DomainName> = typeChecker(
	(input: unknown): input is DomainName => {
		if (!isString(input)) {
			return false;
		}
		/** Initial value is hyphen to return false for .example.com */
		let lastCodePoint = HYPHEN_MINUS;
		let currentLabelIsValid = false;
		let labelCount = 1;
		for (const codePoint of listCodePoints(input)) {
			if (codePoint === FULL_STOP) {
				if (!currentLabelIsValid || lastCodePoint === HYPHEN_MINUS) {
					return false;
				}
				currentLabelIsValid = false;
				labelCount += 1;
			} else if (isSmallLatinCodePoint(codePoint)) {
				currentLabelIsValid = true;
			} else if (codePoint !== HYPHEN_MINUS && !isDigitCodePoint(codePoint)) {
				return false;
			}
			lastCodePoint = codePoint;
		}
		if (lastCodePoint === FULL_STOP || lastCodePoint === HYPHEN_MINUS) {
			return false;
		}
		return 1 < labelCount;
	},
	"DomainName",
);

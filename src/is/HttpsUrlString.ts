import { fromDiagnosis, narrow } from "../narrow.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, Nominal, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isString } from "./String.ts";
import { isUrlHostString } from "./UrlHostString.ts";

/** A string that starts with `https://` and contains a valid URL. */
export type HttpsUrlString = Nominal<string, "HttpsUrlString">;

/**
 * @param input A value to check.
 * @returns A type predicate for `HttpsUrlString`.
 */
function* diagnoseHttpsUrlString(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	let valid = false;
	if (input.startsWith("https://")) {
		let domainPartEnd = input.indexOf("/", 8);
		if (domainPartEnd < 0) {
			domainPartEnd = input.length;
		}
		valid =
			isUrlHostString(input.slice(8, domainPartEnd)) &&
			!input.slice(domainPartEnd).includes(" ");
	}
	if (!valid) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: "an HTTPS URL string",
		};
	}
}

export const isHttpsUrlString: TypeChecker<HttpsUrlString> = typeChecker(
	narrow(
		isString,
		fromDiagnosis<string, HttpsUrlString>(diagnoseHttpsUrlString),
	),
	"HttpsUrlString",
);

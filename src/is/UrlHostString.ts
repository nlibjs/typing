import { fromDiagnosis, narrow } from "../narrow.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, Nominal, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isDomainName } from "./DomainName.ts";
import { isIpv4Address } from "./Ipv4Address.ts";
import { isIpv6Address } from "./Ipv6Address.ts";
import { isString } from "./String.ts";

/** A URL host string. */
export type UrlHostString = Nominal<string, "UrlHostString">;

/**
 * @param input A value to check.
 * @returns A type predicate for `UrlHostString`.
 */
function* diagnoseUrlHostString(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	let valid = false;
	if (input.startsWith("[")) {
		const closeIndex = input.indexOf("]");
		if (0 <= closeIndex && isIpv6Address(input.slice(1, closeIndex))) {
			const remainder = input.slice(closeIndex + 1);
			valid = !remainder || /^:\d+$/.test(remainder);
		}
	} else {
		let colonIndex = input.indexOf(":");
		if (colonIndex < 0) {
			colonIndex = input.length;
		} else if (!/^:\d+$/.test(input.slice(colonIndex))) {
			yield returnIssue ?? {
				code: ValidationIssueCode.NarrowingFailed,
				expected: "a URL host string",
			};
			return;
		}
		const hostname = input.slice(0, colonIndex);
		valid = isDomainName(hostname) || isIpv4Address(hostname);
	}
	if (!valid) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: "a URL host string",
		};
	}
}

export const isUrlHostString: TypeChecker<UrlHostString> = typeChecker(
	narrow(isString, fromDiagnosis<string, UrlHostString>(diagnoseUrlHostString)),
	"UrlHostString",
);

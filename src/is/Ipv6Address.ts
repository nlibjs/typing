import { fromDiagnosis, narrow } from "../narrow.ts";
import { parseIpv6Address } from "../parseIpv6Address.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, Nominal, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isString } from "./String.ts";

/** An IPv6 address. */
export type Ipv6Address = Nominal<string, "Ipv6Address">;

/**
 * @param input A value to check.
 * @returns A type predicate for `Ipv6Address`.
 */
function* diagnoseIpv6Address(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	try {
		const result = parseIpv6Address(input);
		if (result.end === input.length) {
			return;
		}
	} catch {
		// Parse errors are reported as narrowing failures.
	}
	yield returnIssue ?? {
		code: ValidationIssueCode.NarrowingFailed,
		expected: "an IPv6 address",
	};
}

export const isIpv6Address: TypeChecker<Ipv6Address> = typeChecker(
	narrow(isString, fromDiagnosis<string, Ipv6Address>(diagnoseIpv6Address)),
	"Ipv6Address",
);

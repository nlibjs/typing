import { fromDiagnosis, narrow } from "../narrow.ts";
import { parseIpv4Address } from "../parseIpv4Address.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, Nominal, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isString } from "./String.ts";

/** An IPv4 address. */
export type Ipv4Address = Nominal<string, "Ipv4Address">;

/**
 * @param input A value to check.
 * @returns A type predicate for `Ipv4Address`.
 */
function* diagnoseIpv4Address(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	try {
		const result = parseIpv4Address(input);
		if (result.end === input.length) {
			return;
		}
	} catch {
		// Parse errors are reported as narrowing failures.
	}
	yield returnIssue ?? {
		code: ValidationIssueCode.NarrowingFailed,
		expected: "an IPv4 address",
	};
}

export const isIpv4Address: TypeChecker<Ipv4Address> = typeChecker(
	narrow(isString, fromDiagnosis<string, Ipv4Address>(diagnoseIpv4Address)),
	"Ipv4Address",
);

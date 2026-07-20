import { fromDiagnosis, narrow } from "../narrow.ts";
import { typeChecker } from "../typeChecker.ts";
import type { NarrowingIssue, Nominal, TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isDomainName } from "./DomainName.ts";
import { isEmailAddressLocalPart } from "./EmailAddressLocalPart.ts";
import { isString } from "./String.ts";

/**
 * An email address.
 */
export type EmailAddress = Nominal<string, "EmailAddress">;

/**
 * @param input A value to check.
 * @returns A type predicate for `EmailAddress`.
 */
function* diagnoseEmailAddress(
	input: string,
	returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
	if (254 < input.length) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: "an email address",
		};
		return;
	}
	const atMarkIndex = input.lastIndexOf("@");
	if (
		atMarkIndex < 1 ||
		!isEmailAddressLocalPart(input.slice(0, atMarkIndex)) ||
		!isDomainName(input.slice(atMarkIndex + 1))
	) {
		yield returnIssue ?? {
			code: ValidationIssueCode.NarrowingFailed,
			expected: "an email address",
		};
	}
}

export const isEmailAddress: TypeChecker<EmailAddress> = typeChecker(
	narrow(isString, fromDiagnosis<string, EmailAddress>(diagnoseEmailAddress)),
	"EmailAddress",
);

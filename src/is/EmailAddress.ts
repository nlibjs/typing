import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
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
export const isEmailAddress: TypeChecker<EmailAddress> = typeChecker(
	(input: unknown): input is EmailAddress => {
		if (!isString(input)) {
			return false;
		}
		if (254 < input.length) {
			return false;
		}
		const atMarkIndex = input.lastIndexOf("@");
		if (atMarkIndex < 1) {
			return false;
		}
		return (
			isEmailAddressLocalPart(input.slice(0, atMarkIndex)) &&
			isDomainName(input.slice(atMarkIndex + 1))
		);
	},
	"EmailAddress",
);

import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker, TypeGuard } from "../generics.ts";
import { isDomainName } from "./DomainName.ts";
import { isEmailAddressLocalPart } from "./EmailAddressLocalPart.ts";
import { isString } from "./String.ts";

export type EmailAddress = Nominal<string, "EmailAddress">;

export const isEmailAddress: TypeChecker<
	EmailAddress,
	TypeGuard<EmailAddress>
> = createTypeChecker((input: unknown): input is EmailAddress => {
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
});

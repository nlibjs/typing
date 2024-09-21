import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker, TypeGuard } from "../generics.ts";
import { parseIpv6Address } from "../parseIpv6Address.ts";
import { isString } from "./String.ts";

export type Ipv6Address = Nominal<string, "Ipv6Address">;

export const isIpv6Address: TypeChecker<
	Ipv6Address,
	TypeGuard<Ipv6Address>
> = createTypeChecker((input: unknown): input is Ipv6Address => {
	if (isString(input)) {
		try {
			const result = parseIpv6Address(input);
			return result.end === input.length;
		} catch {
			// do nothing
		}
	}
	return false;
});

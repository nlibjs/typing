import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker, TypeGuard } from "../generics.ts";
import { parseIpv4Address } from "../parseIpv4Address.ts";
import { isString } from "./String.ts";

export type Ipv4Address = Nominal<string, "Ipv4Address">;

export const isIpv4Address: TypeChecker<
	Ipv4Address,
	"Ipv4Address",
	TypeGuard<Ipv4Address>
> = createTypeChecker("Ipv4Address", (input: unknown): input is Ipv4Address => {
	if (isString(input)) {
		try {
			const result = parseIpv4Address(input);
			return result.end === input.length;
		} catch {
			// do nothing
		}
	}
	return false;
});

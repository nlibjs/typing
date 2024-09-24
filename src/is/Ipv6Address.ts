import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { parseIpv6Address } from "../parseIpv6Address.ts";
import { isString } from "./String.ts";

export type Ipv6Address = Nominal<string, "Ipv6Address">;
export const isIpv6Address: TypeChecker<Ipv6Address> = typeChecker(
	(input: unknown): input is Ipv6Address => {
		if (isString(input)) {
			try {
				const result = parseIpv6Address(input);
				return result.end === input.length;
			} catch {
				// do nothing
			}
		}
		return false;
	},
	"Ipv6Address",
);

import { createTypeChecker } from "../createTypeChecker.mjs";
import type { Nominal } from "../generics.mjs";
import { parseIpv6Address } from "../parseIpv6Address.mjs";
import { isString } from "./String.mjs";

export type Ipv6Address = Nominal<string, "Ipv6Address">;

export const isIpv6Address = createTypeChecker(
	"Ipv6Address",
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
);

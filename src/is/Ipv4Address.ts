import { parseIpv4Address } from "../parseIpv4Address.ts";
import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isString } from "./String.ts";

/** An IPv4 address. */
export type Ipv4Address = Nominal<string, "Ipv4Address">;

/**
 * @param input A value to check.
 * @returns A type predicate for `Ipv4Address`.
 */
export const isIpv4Address: TypeChecker<Ipv4Address> = typeChecker(
	(input: unknown): input is Ipv4Address => {
		if (isString(input)) {
			try {
				const result = parseIpv4Address(input);
				return result.end === input.length;
			} catch {
				// Ignore parse errors.
			}
		}
		return false;
	},
	"Ipv4Address",
);

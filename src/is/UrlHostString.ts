import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isDomainName } from "./DomainName.ts";
import { isIpv4Address } from "./Ipv4Address.ts";
import { isIpv6Address } from "./Ipv6Address.ts";
import { isString } from "./String.ts";

/** A URL host string. */
export type UrlHostString = Nominal<string, "UrlHostString">;

/**
 * @param input A value to check.
 * @returns A type predicate for `UrlHostString`.
 */
export const isUrlHostString: TypeChecker<UrlHostString> = typeChecker(
	(input: unknown): input is UrlHostString => {
		if (!isString(input)) {
			return false;
		}
		if (input.startsWith("[")) {
			const closeIndex = input.indexOf("]");
			if (closeIndex < 0 || !isIpv6Address(input.slice(1, closeIndex))) {
				return false;
			}
			const remainder = input.slice(closeIndex + 1);
			return !remainder || /^:\d+$/.test(remainder);
		}
		let colonIndex = input.indexOf(":");
		if (colonIndex < 0) {
			colonIndex = input.length;
		} else {
			const remainder = input.slice(colonIndex);
			if (!/^:\d+$/.test(remainder)) {
				return false;
			}
		}
		const hostname = input.slice(0, colonIndex);
		return isDomainName(hostname) || isIpv4Address(hostname);
	},
	"UrlHostString",
);

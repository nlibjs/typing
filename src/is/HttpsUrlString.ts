import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isString } from "./String.ts";
import { isUrlHostString } from "./UrlHostString.ts";

export type HttpsUrlString = Nominal<string, "HttpsUrlString">;
export const isHttpsUrlString: TypeChecker<HttpsUrlString> = typeChecker(
	(input: unknown): input is HttpsUrlString => {
		if (isString(input) && input.startsWith("https://")) {
			let domainPartEnd = input.indexOf("/", 8);
			if (domainPartEnd < 0) {
				domainPartEnd = input.length;
			}
			if (!isUrlHostString(input.slice(8, domainPartEnd))) {
				return false;
			}
			return !input.slice(domainPartEnd).includes(" ");
		}
		return false;
	},
	"HttpsUrlString",
);

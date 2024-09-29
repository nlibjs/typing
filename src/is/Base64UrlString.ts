import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";

/**
 * A string that contains only base64url characters.
 */
export type Base64UrlString = Nominal<string, "Base64UrlString">;

/**
 * @param input A value to check.
 * @returns A type predicate for `Base64UrlString`.
 */
export const isBase64UrlString: TypeChecker<Base64UrlString> =
	typeChecker<Base64UrlString>(/^[A-Za-z0-9\-_]+=*$/, "Base64UrlString");

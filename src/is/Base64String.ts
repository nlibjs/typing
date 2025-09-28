import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";

/**
 * A string that contains only base64 characters.
 */
export type Base64String = Nominal<string, "Base64String">;

/**
 * @param input A value to check.
 * @returns A type predicate for `Base64String`.
 */
export const isBase64String: TypeChecker<Base64String> =
	typeChecker<Base64String>(/^[A-Za-z0-9+/]+=*$/, "Base64String");

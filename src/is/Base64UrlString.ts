import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";

export type Base64UrlString = Nominal<string, "Base64UrlString">;
export const isBase64UrlString: TypeChecker<Base64UrlString> =
	typeChecker<Base64UrlString>(/^[A-Za-z0-9\-_]+=*$/, "Base64UrlString");

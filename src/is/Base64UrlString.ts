import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export type Base64UrlString = Nominal<string, "Base64UrlString">;
export const isBase64UrlString: TypeChecker<
	Base64UrlString,
	"Base64UrlString",
	RegExp
> = createTypeChecker<Base64UrlString, "Base64UrlString">(
	"Base64UrlString",
	/^[A-Za-z0-9\-_]+=*$/,
);

import { createTypeChecker } from "../createTypeChecker.mjs";
import type { Nominal } from "../generics.mjs";

export type Base64UrlString = Nominal<string, "Base64UrlString">;
export const isBase64UrlString = createTypeChecker<
	Base64UrlString,
	"Base64UrlString"
>("Base64UrlString", /^[A-Za-z0-9\-_]+=*$/);

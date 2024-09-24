import type { Nominal, TypeChecker } from "../types.ts";
import { typeChecker } from "../typeChecker.ts";

export type Base64String = Nominal<string, "Base64String">;
export const isBase64String: TypeChecker<Base64String> =
	typeChecker<Base64String>(/^[A-Za-z0-9+/]+=*$/, "Base64String");

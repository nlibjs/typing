import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export type Base64String = Nominal<string, "Base64String">;
export const isBase64String: TypeChecker<Base64String, "Base64String", RegExp> =
	createTypeChecker<Base64String, "Base64String">(
		"Base64String",
		/^[A-Za-z0-9+/]+=*$/,
	);

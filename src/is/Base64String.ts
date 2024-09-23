import type { Nominal, TypeChecker } from "../generics.ts";
import { stringChecker } from "../typing.ts";

export type Base64String = Nominal<string, "Base64String">;
export const isBase64String: TypeChecker<Base64String> = stringChecker(
	/^[A-Za-z0-9+/]+=*$/,
	"Base64String",
);

import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export type CapitalHexString = Nominal<string, "CapitalHexString">;
export const isCapitalHexString: TypeChecker<
	CapitalHexString,
	"CapitalHexString",
	RegExp
> = createTypeChecker<CapitalHexString, "CapitalHexString">(
	"CapitalHexString",
	/^[0-9A-F]*$/,
);

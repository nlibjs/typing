import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export const CapitalLatinCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export type CapitalLatinString = Nominal<string, "CapitalLatinString">;
export const isCapitalLatinString: TypeChecker<
	CapitalLatinString,
	"CapitalLatinString",
	RegExp
> = createTypeChecker<CapitalLatinString, "CapitalLatinString">(
	"CapitalLatinString",
	new RegExp(`^[${CapitalLatinCharacters}]*$`),
);

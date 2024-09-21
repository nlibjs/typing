import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";

export const CapitalLatinCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export type CapitalLatinString = Nominal<string, "CapitalLatinString">;
export const isCapitalLatinString = createTypeChecker<
	CapitalLatinString,
	"CapitalLatinString"
>("CapitalLatinString", new RegExp(`^[${CapitalLatinCharacters}]*$`));

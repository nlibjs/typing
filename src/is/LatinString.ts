import { createTypeChecker } from "../createTypeChecker.mjs";
import type { Nominal } from "../generics.mjs";
import { CapitalLatinCharacters } from "./CapitalLatinString.mjs";
import { SmallLatinCharacters } from "./SmallLatinString.mjs";

export const LatinCharacters = `${SmallLatinCharacters}${CapitalLatinCharacters}`;
export type LatinString = Nominal<string, "LatinString">;
export const isLatinString = createTypeChecker<LatinString, "LatinString">(
	"LatinString",
	new RegExp(`^[${LatinCharacters}]*$`),
);

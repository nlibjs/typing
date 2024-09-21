import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";
import { CapitalLatinCharacters } from "./CapitalLatinString.ts";
import { SmallLatinCharacters } from "./SmallLatinString.ts";

export const LatinCharacters = `${SmallLatinCharacters}${CapitalLatinCharacters}`;
export type LatinString = Nominal<string, "LatinString">;
export const isLatinString = createTypeChecker<LatinString, "LatinString">(
	"LatinString",
	new RegExp(`^[${LatinCharacters}]*$`),
);

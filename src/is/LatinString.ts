import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";
import { CapitalLatinCharacters } from "./CapitalLatinString.ts";
import { SmallLatinCharacters } from "./SmallLatinString.ts";

export const LatinCharacters: string = `${SmallLatinCharacters}${CapitalLatinCharacters}`;
export type LatinString = Nominal<string, "LatinString">;
export const isLatinString: TypeChecker<LatinString, RegExp> =
	createTypeChecker<LatinString>(new RegExp(`^[${LatinCharacters}]*$`));

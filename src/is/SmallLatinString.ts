import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";

export const SmallLatinCharacters = "abcdefghijklmnopqrstuvwxyz";
export type SmallLatinString = Nominal<string, "SmallLatinString">;
export const isSmallLatinString = createTypeChecker<
	SmallLatinString,
	"SmallLatinString"
>("SmallLatinString", /^[a-z]*$/);

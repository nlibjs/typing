import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export const SmallLatinCharacters = "abcdefghijklmnopqrstuvwxyz";
export type SmallLatinString = Nominal<string, "SmallLatinString">;
export const isSmallLatinString: TypeChecker<
	SmallLatinString,
	"SmallLatinString",
	RegExp
> = createTypeChecker<SmallLatinString, "SmallLatinString">(
	"SmallLatinString",
	/^[a-z]*$/,
);

import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";
import { LatinCharacters } from "./LatinString.ts";
import { NumericCharacters } from "./NumberString.ts";

export const AlphaNumericCharacters = `${LatinCharacters}${NumericCharacters}`;
export type AlphaNumericString = Nominal<string, "AlphaNumericString">;
export const isAlphaNumericString = createTypeChecker<
	AlphaNumericString,
	"AlphaNumericString"
>("AlphaNumericString", new RegExp(`^[${AlphaNumericCharacters}]*$`));

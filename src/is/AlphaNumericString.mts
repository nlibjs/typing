import { createTypeChecker } from "../createTypeChecker.mjs";
import type { Nominal } from "../generics.mjs";
import { LatinCharacters } from "./LatinString.mjs";
import { NumericCharacters } from "./NumberString.mjs";

export const AlphaNumericCharacters = `${LatinCharacters}${NumericCharacters}`;
export type AlphaNumericString = Nominal<string, "AlphaNumericString">;
export const isAlphaNumericString = createTypeChecker<
	AlphaNumericString,
	"AlphaNumericString"
>("AlphaNumericString", new RegExp(`^[${AlphaNumericCharacters}]*$`));

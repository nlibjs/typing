import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";
import { LatinCharacters } from "./LatinString.ts";
import { NumericCharacters } from "./NumberString.ts";

export const AlphaNumericCharacters: string = `${LatinCharacters}${NumericCharacters}`;
export type AlphaNumericString = Nominal<string, "AlphaNumericString">;
export const isAlphaNumericString: TypeChecker<AlphaNumericString, RegExp> =
	createTypeChecker<AlphaNumericString>(
		new RegExp(`^[${AlphaNumericCharacters}]*$`),
	);
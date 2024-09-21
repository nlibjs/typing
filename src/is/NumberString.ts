import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export const NumericCharacters = "0123456789";
export type NumberString = Nominal<string, "NumberString">;
export const isNumberString: TypeChecker<NumberString, "NumberString", RegExp> =
	createTypeChecker<NumberString, "NumberString">(
		"NumberString",
		new RegExp(`^[${NumericCharacters}]*$`),
	);

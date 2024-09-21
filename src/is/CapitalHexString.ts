import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export type CapitalHexString = Nominal<string, "CapitalHexString">;
export const isCapitalHexString: TypeChecker<CapitalHexString, RegExp> =
	createTypeChecker<CapitalHexString>(/^[0-9A-F]*$/);

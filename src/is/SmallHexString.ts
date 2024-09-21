import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export type SmallHexString = Nominal<string, "SmallHexString">;
export const isSmallHexString: TypeChecker<SmallHexString, RegExp> =
	createTypeChecker<SmallHexString>(/^[0-9a-f]*$/);

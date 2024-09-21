import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker } from "../generics.ts";

export type SmallHexString = Nominal<string, "SmallHexString">;
export const isSmallHexString: TypeChecker<
	SmallHexString,
	"SmallHexString",
	RegExp
> = createTypeChecker<SmallHexString, "SmallHexString">(
	"SmallHexString",
	/^[0-9a-f]*$/,
);

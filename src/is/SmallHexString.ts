import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";

export type SmallHexString = Nominal<string, "SmallHexString">;
export const isSmallHexString = createTypeChecker<
	SmallHexString,
	"SmallHexString"
>("SmallHexString", /^[0-9a-f]*$/);

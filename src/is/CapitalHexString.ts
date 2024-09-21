import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";

export type CapitalHexString = Nominal<string, "CapitalHexString">;
export const isCapitalHexString = createTypeChecker<
	CapitalHexString,
	"CapitalHexString"
>("CapitalHexString", /^[0-9A-F]*$/);

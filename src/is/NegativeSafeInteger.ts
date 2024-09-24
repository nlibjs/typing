import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNegativeSafeInteger: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isSafeInteger(input) && input < 0,
	"NegativeSafeInteger",
);

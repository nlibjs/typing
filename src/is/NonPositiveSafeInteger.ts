import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isSafeInteger } from "./SafeInteger.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for non-positive safe integers.
 */
export const isNonPositiveSafeInteger: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isSafeInteger(input) && input <= 0,
	"NonPositiveSafeInteger",
);

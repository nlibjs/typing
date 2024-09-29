import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isSafeInteger } from "./SafeInteger.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for positive safe integers.
 */
export const isPositiveSafeInteger: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isSafeInteger(input) && 0 < input,
	"PositiveSafeInteger",
);

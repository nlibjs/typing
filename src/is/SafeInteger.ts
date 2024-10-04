import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for safe integers.
 */
export const isSafeInteger: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => Number.isSafeInteger(input),
	"SafeInteger",
);

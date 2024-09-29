import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker, TypeGuard } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for safe integers.
 */
export const isSafeInteger: TypeChecker<number> = typeChecker(
	Number.isSafeInteger as TypeGuard<number>,
	"SafeInteger",
);

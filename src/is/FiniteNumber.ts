import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker, TypeGuard } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for finite numbers.
 */
export const isFiniteNumber: TypeChecker<number> = typeChecker(
	Number.isFinite as TypeGuard<number>,
	"FiniteNumber",
);

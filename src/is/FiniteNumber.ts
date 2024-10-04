import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for finite numbers.
 */
export const isFiniteNumber: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => Number.isFinite(input),
	"FiniteNumber",
);

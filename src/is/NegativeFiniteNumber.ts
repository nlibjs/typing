import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for negative finite numbers.
 */
export const isNegativeFiniteNumber: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isFiniteNumber(input) && input < 0,
	"NegativeFiniteNumber",
);

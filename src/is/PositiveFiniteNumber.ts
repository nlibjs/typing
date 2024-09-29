import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for positive finite numbers.
 */
export const isPositiveFiniteNumber: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isFiniteNumber(input) && 0 < input,
	"PositiveFiniteNumber",
);

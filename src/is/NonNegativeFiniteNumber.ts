import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNonNegativeFiniteNumber: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isFiniteNumber(input) && 0 <= input,
	"NonNegativeFiniteNumber",
);

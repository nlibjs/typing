import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNonPositiveFiniteNumber: TypeChecker<number> = typeChecker(
	(input: unknown): input is number => isFiniteNumber(input) && input <= 0,
	"NonPositiveFiniteNumber",
);

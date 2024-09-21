import { createTypeChecker } from "../createTypeChecker.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNonNegativeFiniteNumber = createTypeChecker(
	"NonNegativeFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && 0 <= input,
);

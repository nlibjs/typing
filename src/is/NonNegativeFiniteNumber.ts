import { createTypeChecker } from "../createTypeChecker.mjs";
import { isFiniteNumber } from "./FiniteNumber.mjs";

export const isNonNegativeFiniteNumber = createTypeChecker(
	"NonNegativeFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && 0 <= input,
);

import { createTypeChecker } from "../createTypeChecker.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNegativeFiniteNumber = createTypeChecker(
	"NegativeFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && input < 0,
);

import { createTypeChecker } from "../createTypeChecker.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNonPositiveFiniteNumber = createTypeChecker(
	"NonPositiveFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && input <= 0,
);

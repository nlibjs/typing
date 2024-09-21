import { createTypeChecker } from "../createTypeChecker.mjs";
import { isFiniteNumber } from "./FiniteNumber.mjs";

export const isNonPositiveFiniteNumber = createTypeChecker(
	"NonPositiveFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && input <= 0,
);

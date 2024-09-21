import { createTypeChecker } from "../createTypeChecker.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isPositiveFiniteNumber = createTypeChecker(
	"PositiveFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && 0 < input,
);

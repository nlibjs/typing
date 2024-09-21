import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isPositiveFiniteNumber: TypeChecker<
	number,
	"PositiveFiniteNumber",
	TypeGuard<number>
> = createTypeChecker(
	"PositiveFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && 0 < input,
);

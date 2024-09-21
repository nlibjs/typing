import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNonPositiveFiniteNumber: TypeChecker<
	number,
	"NonPositiveFiniteNumber",
	TypeGuard<number>
> = createTypeChecker(
	"NonPositiveFiniteNumber",
	(input: unknown): input is number => isFiniteNumber(input) && input <= 0,
);

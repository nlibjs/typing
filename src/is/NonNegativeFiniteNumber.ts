import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isFiniteNumber } from "./FiniteNumber.ts";

export const isNonNegativeFiniteNumber: TypeChecker<
	number,
	TypeGuard<number>
> = createTypeChecker(
	(input: unknown): input is number => isFiniteNumber(input) && 0 <= input,
);
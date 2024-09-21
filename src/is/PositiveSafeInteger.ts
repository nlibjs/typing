import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isPositiveSafeInteger: TypeChecker<
	number,
	"PositiveSafeInteger",
	TypeGuard<number>
> = createTypeChecker(
	"PositiveSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && 0 < input,
);

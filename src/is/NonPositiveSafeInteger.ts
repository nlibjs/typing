import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNonPositiveSafeInteger: TypeChecker<
	number,
	"NonPositiveSafeInteger",
	TypeGuard<number>
> = createTypeChecker(
	"NonPositiveSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && input <= 0,
);

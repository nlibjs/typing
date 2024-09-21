import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNegativeSafeInteger: TypeChecker<
	number,
	"NegativeSafeInteger",
	TypeGuard<number>
> = createTypeChecker(
	"NegativeSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && input < 0,
);

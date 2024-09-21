import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNonNegativeSafeInteger: TypeChecker<
	number,
	TypeGuard<number>
> = createTypeChecker(
	(input: unknown): input is number => isSafeInteger(input) && 0 <= input,
);

import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isSafeInteger: TypeChecker<
	number,
	TypeGuard<number>
> = createTypeChecker(Number.isSafeInteger as TypeGuard<number>);

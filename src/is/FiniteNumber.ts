import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isFiniteNumber: TypeChecker<
	number,
	TypeGuard<number>
> = createTypeChecker(Number.isFinite as TypeGuard<number>);

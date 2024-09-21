import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isFiniteNumber: TypeChecker<
	number,
	"FiniteNumber",
	TypeGuard<number>
> = createTypeChecker("FiniteNumber", Number.isFinite as TypeGuard<number>);

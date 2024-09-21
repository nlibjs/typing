import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isSafeInteger: TypeChecker<
	number,
	"SafeInteger",
	TypeGuard<number>
> = createTypeChecker("SafeInteger", Number.isSafeInteger as TypeGuard<number>);

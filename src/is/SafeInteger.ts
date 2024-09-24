import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker, TypeGuard } from "../types.ts";

export const isSafeInteger: TypeChecker<number> = typeChecker(
	Number.isSafeInteger as TypeGuard<number>,
	"SafeInteger",
);

import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker, TypeGuard } from "../types.ts";

export const isFiniteNumber: TypeChecker<number> = typeChecker(
	Number.isFinite as TypeGuard<number>,
	"FiniteNumber",
);

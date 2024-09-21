import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeGuard } from "../generics.ts";

export const isFiniteNumber = createTypeChecker(
	"FiniteNumber",
	Number.isFinite as TypeGuard<number>,
);

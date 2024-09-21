import { createTypeChecker } from "../createTypeChecker.mjs";
import type { TypeGuard } from "../generics.mjs";

export const isFiniteNumber = createTypeChecker(
	"FiniteNumber",
	Number.isFinite as TypeGuard<number>,
);

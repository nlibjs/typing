import { createTypeChecker } from "../createTypeChecker.mjs";
import type { TypeGuard } from "../generics.mjs";

export const isSafeInteger = createTypeChecker(
	"SafeInteger",
	Number.isSafeInteger as TypeGuard<number>,
);

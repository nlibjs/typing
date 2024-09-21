import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeGuard } from "../generics.ts";

export const isSafeInteger = createTypeChecker(
	"SafeInteger",
	Number.isSafeInteger as TypeGuard<number>,
);

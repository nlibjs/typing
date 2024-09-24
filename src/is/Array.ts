import type { TypeChecker } from "../types.ts";
import { typeChecker } from "../typeChecker.ts";

export const isArray: TypeChecker<Array<unknown>> = typeChecker(
	Array.isArray,
	"Array",
);

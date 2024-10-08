import type { TypeChecker } from "../types.ts";
import { typeChecker } from "../typeChecker.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `Array<unknown>`.
 */
export const isArray: TypeChecker<Array<unknown>> = typeChecker(
	(input: unknown): input is Array<unknown> => Array.isArray(input),
	"Array",
);

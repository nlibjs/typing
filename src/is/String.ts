import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `string`.
 */
export const isString: TypeChecker<string> = typeChecker(
	(input: unknown): input is string => typeof input === "string",
	"string",
);

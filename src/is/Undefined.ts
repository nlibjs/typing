import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `undefined`.
 */
export const isUndefined: TypeChecker<undefined> = typeChecker(
	(input: unknown): input is undefined => typeof input === "undefined",
	"undefined",
);

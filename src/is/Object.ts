import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `Record<string, unknown>`.
 */
export const isObject: TypeChecker<Record<string, unknown>> = typeChecker(
	(input: unknown): input is Record<string, unknown> =>
		typeof input === "function" ||
		(typeof input === "object" && input !== null),
	"object",
);

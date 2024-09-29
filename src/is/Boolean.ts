import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `boolean`.
 */
export const isBoolean: TypeChecker<boolean> = typeChecker(
	(input) => typeof input === "boolean",
	"boolean",
);

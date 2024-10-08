import type { TypeChecker } from "../types.ts";
import { typeChecker } from "../typeChecker.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `never`.
 */
export const isNever: TypeChecker<never> = typeChecker(
	(_input: unknown): _input is never => false,
	"never",
);

import { typeChecker } from "../typeChecker.ts";
import type { Callable, TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `Callable`.
 */
export const isFunction: TypeChecker<Callable> = typeChecker(
	(input: unknown): input is Callable => typeof input === "function",
	"function",
);

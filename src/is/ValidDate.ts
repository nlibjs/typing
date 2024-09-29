import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

const isDate: TypeChecker<Date> = typeChecker<Date>("Date");

/**
 * @param input A value to check.
 * @returns A type predicate for `Date`.
 */
export const isValidDate: TypeChecker<Date> = typeChecker(
	(input: unknown): input is Date => isDate(input) && 0 < input.getTime(),
);

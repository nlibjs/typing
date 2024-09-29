import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

/**
 * @param input A value to check.
 * @returns A type predicate for `null`.
 */
export const isNull: TypeChecker<null> = typeChecker(
	(input: unknown): input is null => input === null,
	"null",
);

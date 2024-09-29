import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isString } from "./String.ts";

/** A UUID in uppercase. */
export type UUIDUppercase = Nominal<string, "UUIDUppercase">;

const UUIDUppercaseRegExp =
	/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/;

/**
 * @param input A value to check.
 * @returns A type predicate for `UUIDUppercase`.
 */
export const isUUIDUppercase: TypeChecker<UUIDUppercase> = typeChecker(
	(input: unknown): input is UUIDUppercase =>
		isString(input) && UUIDUppercaseRegExp.test(input),
	"UUIDUppercase",
);

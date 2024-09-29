import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isString } from "./String.ts";

/** A UUID in lowercase. */
export type UUIDLowercase = Nominal<string, "UUIDLowercase">;

const UUIDLowercaseRegExp =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * @param input A value to check.
 * @returns A type predicate for `UUIDLowercase`.
 */
export const isUUIDLowercase: TypeChecker<UUIDLowercase> = typeChecker(
	(input: unknown): input is UUIDLowercase =>
		isString(input) && UUIDLowercaseRegExp.test(input),
	"UUIDLowercase",
);

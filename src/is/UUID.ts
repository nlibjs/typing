import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isString } from "./String.ts";

/** A UUID. */
export type UUID = Nominal<string, "UUID">;

const UUIDRegExp =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * @param input A value to check.
 * @returns A type predicate for `UUID`.
 */
export const isUUID: TypeChecker<UUID> = typeChecker(
	(input: unknown): input is UUID => isString(input) && UUIDRegExp.test(input),
	"UUID",
);

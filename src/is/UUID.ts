import { typeChecker } from "../typeChecker.ts";
import type { Nominal, TypeChecker } from "../types.ts";
import { isString } from "./String.ts";

export type UUID = Nominal<string, "UUID">;
export const UUIDRegExp =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUUID: TypeChecker<UUID> = typeChecker(
	(input: unknown): input is UUID => isString(input) && UUIDRegExp.test(input),
	"UUID",
);

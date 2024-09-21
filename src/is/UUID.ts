import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal } from "../generics.ts";
import { isString } from "./String.ts";

export type UUID = Nominal<string, "UUID">;
export const UUIDRegExp =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUUID = createTypeChecker(
	"UUID",
	(input: unknown): input is UUID => isString(input) && UUIDRegExp.test(input),
);

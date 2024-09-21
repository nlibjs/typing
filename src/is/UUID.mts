import { createTypeChecker } from "../createTypeChecker.mjs";
import type { Nominal } from "../generics.mjs";
import { isString } from "./String.mjs";

export type UUID = Nominal<string, "UUID">;
export const UUIDRegExp =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUUID = createTypeChecker(
	"UUID",
	(input: unknown): input is UUID => isString(input) && UUIDRegExp.test(input),
);

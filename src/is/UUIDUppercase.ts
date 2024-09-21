import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker, TypeGuard } from "../generics.ts";
import { isString } from "./String.ts";

export type UUIDUppercase = Nominal<string, "UUIDUppercase">;
export const UUIDUppercaseRegExp =
	/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/;

export const isUUIDUppercase: TypeChecker<
	UUIDUppercase,
	TypeGuard<UUIDUppercase>
> = createTypeChecker(function is$UUIDUppercase(
	input: unknown,
): input is UUIDUppercase {
	return isString(input) && UUIDUppercaseRegExp.test(input);
});

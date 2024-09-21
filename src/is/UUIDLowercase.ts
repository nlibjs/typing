import { createTypeChecker } from "../createTypeChecker.ts";
import type { Nominal, TypeChecker, TypeGuard } from "../generics.ts";
import { isString } from "./String.ts";

export type UUIDLowercase = Nominal<string, "UUIDLowercase">;
export const UUIDLowercaseRegExp =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUUIDLowercase: TypeChecker<
	UUIDLowercase,
	TypeGuard<UUIDLowercase>
> = createTypeChecker(function is$UUIDLowercase(
	input: unknown,
): input is UUIDLowercase {
	return isString(input) && UUIDLowercaseRegExp.test(input);
});

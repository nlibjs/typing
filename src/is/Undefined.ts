import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isUndefined: TypeChecker<
	undefined,
	"Undefined",
	TypeGuard<undefined>
> = createTypeChecker(
	"Undefined",
	(input: unknown): input is undefined => typeof input === "undefined",
);

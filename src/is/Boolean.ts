import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isBoolean: TypeChecker<
	boolean,
	"Boolean",
	TypeGuard<boolean>
> = createTypeChecker(
	"Boolean",
	(input: unknown): input is boolean => typeof input === "boolean",
);

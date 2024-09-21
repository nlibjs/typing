import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isNull: TypeChecker<
	null,
	"Null",
	TypeGuard<null>
> = createTypeChecker(
	"Null",
	(input: unknown): input is null => input === null,
);

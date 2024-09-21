import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";

export const isNull: TypeChecker<null, TypeGuard<null>> = createTypeChecker(
	(input: unknown): input is null => input === null,
);

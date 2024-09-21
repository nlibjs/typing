import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { getType } from "../getType.ts";

const isDate = createTypeChecker(
	(input: unknown): input is Date => getType(input) === "Date",
);

export const isValidDate: TypeChecker<
	Date,
	TypeGuard<Date>
> = createTypeChecker(
	(input: unknown): input is Date => isDate(input) && 0 < input.getTime(),
);

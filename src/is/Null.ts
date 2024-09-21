import { createTypeChecker } from "../createTypeChecker.ts";

export const isNull = createTypeChecker(
	"Null",
	(input: unknown): input is null => input === null,
);

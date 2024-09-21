import { createTypeChecker } from "../createTypeChecker.mjs";

export const isNull = createTypeChecker(
	"Null",
	(input: unknown): input is null => input === null,
);

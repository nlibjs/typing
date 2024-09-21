import { createTypeChecker } from "../createTypeChecker.ts";

export const isBoolean = createTypeChecker(
	"Boolean",
	(input: unknown): input is boolean => typeof input === "boolean",
);

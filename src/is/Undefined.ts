import { createTypeChecker } from "../createTypeChecker.ts";

export const isUndefined = createTypeChecker(
	"Undefined",
	(input: unknown): input is undefined => typeof input === "undefined",
);

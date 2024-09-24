import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

export const isString: TypeChecker<string> = typeChecker(
	(input: unknown): input is string => typeof input === "string",
	"string",
);

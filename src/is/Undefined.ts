import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

export const isUndefined: TypeChecker<undefined> = typeChecker(
	(input: unknown): input is undefined => typeof input === "undefined",
	"undefined",
);

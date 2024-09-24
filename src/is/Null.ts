import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

export const isNull: TypeChecker<null> = typeChecker(
	(input: unknown): input is null => input === null,
	"null",
);

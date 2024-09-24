import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

export const isBoolean: TypeChecker<boolean> = typeChecker(
	(input) => typeof input === "boolean",
	"boolean",
);

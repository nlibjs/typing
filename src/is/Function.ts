import { typeChecker } from "../typeChecker.ts";
import type { Callable, TypeChecker } from "../types.ts";

export const isFunction: TypeChecker<Callable> = typeChecker(
	(input: unknown): input is Callable => typeof input === "function",
	"function",
);

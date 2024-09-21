import { createTypeChecker } from "../createTypeChecker.ts";
import type { Callable } from "../generics.ts";

export const isFunction = createTypeChecker(
	"Function",
	(input: unknown): input is Callable => typeof input === "function",
);

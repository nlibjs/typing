import { createTypeChecker } from "../createTypeChecker.ts";
import type { Callable, TypeChecker, TypeGuard } from "../generics.ts";

export const isFunction: TypeChecker<
	Callable,
	"Function",
	TypeGuard<Callable>
> = createTypeChecker(
	"Function",
	(input: unknown): input is Callable => typeof input === "function",
);

import { createTypeChecker } from "../createTypeChecker.ts";
import type { Callable, TypeChecker, TypeGuard } from "../generics.ts";

export const isFunction: TypeChecker<
	Callable,
	TypeGuard<Callable>
> = createTypeChecker(
	(input: unknown): input is Callable => typeof input === "function",
);

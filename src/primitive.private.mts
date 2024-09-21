import type { TypeGuard, Callable, TypeChecker } from "./generics.mjs";
import { getType } from "./getType.mjs";

export const is$String = (input: unknown): input is string =>
	typeof input === "string";

export const is$Array = Array.isArray as TypeGuard<Array<unknown>>;

export const is$Function = (input: unknown): input is Callable =>
	typeof input === "function";

export const is$Object = (input: unknown): input is Record<string, unknown> => {
	return is$Function(input) || (typeof input === "object" && input !== null);
};

export const is$RegExp = (input: unknown): input is RegExp =>
	getType(input) === "RegExp";

export const is$TypeChecker = <T, N extends string>(
	input: unknown,
): input is TypeChecker<T, N> => {
	return (
		typeof input === "function" &&
		is$Object(input) &&
		is$String(input.type) &&
		"definition" in input
	);
};

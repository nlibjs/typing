import { typeChecker } from "./typeChecker.ts";
import type { TypeDefinition } from "./types.ts";

/**
 * Ensures that the input matches the definition and returns it.
 * The returned value is guaranteed to match the defined type.
 * @example
 * ```typescript
 * const isProduct = typeChecker({
 *   id: isString,
 *   name: isString.optional,
 *   colors: isColor.array,
 * })
 * const response = await fetch("https://api.example.com/product/1");
 * const product = ensure(await response.json(), isProduct);
 * ```
 * @param input The value to check.
 * @param definition The type definition.
 * @returns The input value as the defined type.
 */
export const ensure = <const T>(
	input: unknown,
	definition: TypeDefinition<NoInfer<T>>,
): T => {
	const error = typeChecker(definition).test(input);
	if (error) {
		throw error;
	}
	return input as T;
};

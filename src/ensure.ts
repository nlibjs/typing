import { typeChecker } from "./typeChecker.ts";
import type { TypeDefinition } from "./types.ts";

/**
 * It ensures that the input matches the definition and returns the input.
 * The returned value is guaranteed to be of the type defined by the definition.
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
 * @param input value to be checked.
 * @param definition definition of the type.
 * @returns input value as the defined type.
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

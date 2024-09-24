import { typeChecker, type TypeDefinition } from "./typeChecker.ts";

export const ensure = <T>(input: unknown, definition: TypeDefinition<T>): T => {
	const error = typeChecker(definition).test(input);
	if (error) {
		throw error;
	}
	return input as T;
};

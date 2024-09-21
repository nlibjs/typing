import type {
	TypeGuard,
	DefinitionEnum,
	DefinitionCandidates,
	DefinitionConditions,
	DefinitionObject,
	TypeChecker,
	Definition,
} from "./generics.mjs";
import {
	isDefinitionEnum,
	isDefinitionCandidates,
	isDefinitionConditions,
	arrayDefinitionStore,
	optionalDefinitionStore,
} from "./definition.private.mjs";
import { stringifyDefinition } from "./stringifyDefinition.private.mjs";
import { ModuleError } from "./ModuleError.private.mjs";
import {
	is$Array,
	is$Function,
	is$Object,
	is$RegExp,
	is$String,
	is$TypeChecker,
} from "./primitive.private.mjs";
import { testValue } from "./testValue.mjs";

export interface CheckErrorFailedResult {
	path: string;
	input: unknown;
	definition: Definition;
	message: string;
}

export type CheckErrorResult = CheckErrorFailedResult | null;

const keys = Object.keys as <T>(value: T) => Array<keyof T>;

const stringifyError = (error: Exclude<CheckErrorResult, null>): string =>
	[
		`${error.path}: ${error.message}`,
		`actual: ${JSON.stringify(error.input, null, 2)}`,
		`expected: ${stringifyDefinition(error.definition)}`,
	].join("\n");

const getDefinitionFunctionError = (
	input: unknown,
	definition: TypeChecker<unknown> | TypeGuard<unknown>,
	path: string,
): CheckErrorResult =>
	definition(input)
		? null
		: {
				input,
				definition,
				path,
				message: `The input doesn't pass the test (${definition.name}).`,
			};

const getDefinitionEnumError = (
	input: unknown,
	definition: DefinitionEnum<unknown>,
	path: string,
): CheckErrorResult => {
	for (const value of definition) {
		if (value === input) {
			return null;
		}
	}
	return {
		input,
		definition,
		path,
		message: `The input (${input}) isn't in enum (${[...definition].join(
			", ",
		)}).`,
	};
};

const getDefinitionCandidatesError = (
	input: unknown,
	definition: DefinitionCandidates<unknown>,
	path: string,
): CheckErrorResult => {
	const errors: Array<CheckErrorFailedResult> = [];
	for (const candidate of definition) {
		const error = getTypeError(input, candidate, path);
		if (!error) {
			return null;
		}
		errors.push(error);
	}
	return {
		input,
		definition,
		path,
		message: `The input doesn't pass any tests.\n${errors
			.map(stringifyError)
			.join("\n")}`,
	};
};

const getDefinitionConditionsError = (
	input: unknown,
	definition: DefinitionConditions<unknown>,
	path: string,
): CheckErrorResult => {
	let index = 0;
	for (const candidate of definition) {
		const error = getTypeError(input, candidate, path);
		if (error) {
			return {
				input,
				definition,
				path,
				message: `#${index} definition returned an error.\n${stringifyError(
					error,
				)}`,
			};
		}
		index++;
	}
	return null;
};

const getDefinitionObjectError = (
	input: unknown,
	definition: DefinitionObject<unknown>,
	path: string,
): CheckErrorResult => {
	if (!is$Object(input)) {
		return {
			input,
			definition,
			path,
			message: "The input is not a map.",
		};
	}
	for (const key of keys(definition)) {
		const error = getTypeError(
			input[String(key)],
			definition[key],
			`${path}.${key}`,
		);
		if (error) {
			return error;
		}
	}
	return null;
};

const checkArrayDefinitionError = (
	input: Array<unknown>,
	definition: Definition,
	path: string,
): CheckErrorResult => {
	const { length } = input;
	for (let index = 0; index < length; index++) {
		const error = getTypeError(input[index], definition, `${path}.${index}`);
		if (error) {
			return error;
		}
	}
	return null;
};

const getTypeCheckerDefinitionError = (
	input: unknown,
	typeChecker: TypeChecker<unknown>,
	path: string,
): CheckErrorResult => {
	let definition = arrayDefinitionStore.get(typeChecker);
	if (definition) {
		if (is$Array(input)) {
			return checkArrayDefinitionError(input, definition, path);
		}
		return { input, definition, path, message: "The input is not an array." };
	}
	definition = optionalDefinitionStore.get(typeChecker);
	if (definition) {
		if (input === undefined) {
			return null;
		}
		return getTypeError(input, definition, path);
	}
	return getTypeError(input, typeChecker.definition, path);
};

const getRegExpDefinitionError = (
	input: unknown,
	definition: RegExp,
	path: string,
): CheckErrorResult => {
	if (!is$String(input)) {
		return { input, definition, path, message: "The input is not a string." };
	}
	if (definition.test(input)) {
		return null;
	}
	return {
		input,
		definition,
		path,
		message: `"${input}" doesn't match to ${definition}.`,
	};
};

export const getTypeError = (
	input: unknown,
	definition: Definition,
	path: string,
): CheckErrorResult => {
	if (!path) {
		return { input, definition, path, message: "The type has no path." };
	}
	if (is$TypeChecker(definition)) {
		return getTypeCheckerDefinitionError(input, definition, path);
	}
	if (is$RegExp(definition)) {
		return getRegExpDefinitionError(input, definition, path);
	}
	if (
		(is$Function as TypeGuard<TypeChecker<unknown> | TypeGuard<unknown>>)(
			definition,
		)
	) {
		return getDefinitionFunctionError(input, definition, path);
	}
	if (isDefinitionEnum<unknown>(definition)) {
		return getDefinitionEnumError(input, definition, path);
	}
	if (isDefinitionCandidates(definition)) {
		return getDefinitionCandidatesError(input, definition, path);
	}
	if (isDefinitionConditions(definition)) {
		return getDefinitionConditionsError(input, definition, path);
	}
	return getDefinitionObjectError(input, definition, path);
};

export function ensure<T>(input: unknown, definition: Definition<T>): T;
export function ensure<T, S>(
	input: unknown,
	definition: Definition<T>,
	fallbackValue: S,
): S | T;
// eslint-disable-next-line func-style
export function ensure<T, S>(
	input: unknown,
	definition: Definition<T>,
	fallbackValue?: S,
) {
	if (testValue(input, definition)) {
		return input;
	}
	if (fallbackValue === undefined) {
		const error: CheckErrorResult = getTypeError(input, definition, "_") || {
			input,
			definition,
			path: "_",
			message: "The input doesn't match to the definition.",
		};
		throw new ModuleError({
			code: "TypeCheckError",
			message: `TypeCheckError: ${stringifyError(error)}`,
			data: error,
		});
	}
	return fallbackValue;
}

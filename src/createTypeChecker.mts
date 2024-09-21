/* eslint-disable func-style */
import { cacheResult } from "./cacheResult.private.mjs";
import { cloneDefinition } from "./cloneDefinition.mjs";
import {
	arrayDefinitionStore,
	dictionaryDefinitionStore,
	optionalDefinitionStore,
} from "./definition.private.mjs";
import type {
	Definition,
	DefinitionCandidates,
	DefinitionConditions,
	DefinitionEnum,
	DefinitionObject,
	KeyValuePair,
	TypeChecker,
	TypeGuard,
} from "./generics.mjs";
import { ModuleError } from "./ModuleError.private.mjs";
import {
	is$Array,
	is$Object,
	is$String,
	is$TypeChecker,
} from "./primitive.private.mjs";
import { testValue } from "./testValue.mjs";

const { entries, defineProperties } = Object as {
	entries: <T>(object: T) => Array<KeyValuePair<T>>;
	defineProperties: <T, P>(
		object: T,
		props: { [K in keyof P]: { get: () => P[K] } | { value: P[K] } },
	) => P & T;
};

export function createTypeChecker<T extends string, N extends string = string>(
	type: N,
	definition: RegExp,
): TypeChecker<T, N, RegExp>;
export function createTypeChecker<T, N extends string = string>(
	type: N,
	definition: DefinitionEnum<T>,
): TypeChecker<T, N, DefinitionEnum<T>>;
export function createTypeChecker<T, N extends string = string>(
	type: N,
	definition: DefinitionCandidates<T>,
): TypeChecker<T, N, DefinitionCandidates<T>>;
export function createTypeChecker<T, N extends string = string>(
	type: N,
	definition: DefinitionConditions<T>,
): TypeChecker<T, N, DefinitionConditions<T>>;
export function createTypeChecker<T, N extends string = string>(
	type: N,
	definition: TypeGuard<T>,
): TypeChecker<T, N, TypeGuard<T>>;
export function createTypeChecker<T, N extends string = string>(
	type: N,
	definition: DefinitionObject<T>,
): TypeChecker<T, N, DefinitionObject<T>>;
// eslint-disable-next-line max-lines-per-function
export function createTypeChecker<
	T,
	N extends string = string,
	D extends Definition<T> = Definition<T>,
>(type: N, definition: D): TypeChecker<T, N, D> {
	if (!type) {
		throw new ModuleError({ code: "NoTypeName", data: { type, definition } });
	}
	if (is$TypeChecker(definition)) {
		throw new ModuleError({
			code: "UselessWrapping",
			message: `UselessWrapping: ${type}(${definition.name})`,
			data: { type, definition },
		});
	}
	const typeChecker = defineProperties(
		(input: unknown): input is T => testValue<T>(input, definition),
		{
			type: { value: type },
			name: { value: `is${type}` },
			array: {
				get: cacheResult(() => {
					const checker = createTypeChecker<Array<T>, `Array<${N}>`>(
						`Array<${type}>`,
						(input: unknown): input is Array<T> => {
							return (
								is$Array(input) && input.every((item) => typeChecker(item))
							);
						},
					);
					arrayDefinitionStore.set(checker, definition);
					return checker;
				}),
			},
			optional: {
				get: cacheResult(() => {
					const checker = createTypeChecker<T | undefined, `${N}?`>(
						`${type}?`,
						(input: unknown): input is T | undefined => {
							return input === undefined || typeChecker(input);
						},
					);
					optionalDefinitionStore.set(checker, definition);
					return checker;
				}),
			},
			dictionary: {
				get: cacheResult(() => {
					const checker = createTypeChecker<
						Record<string, T>,
						`Record<string, ${N}>`
					>(
						`Record<string, ${type}>`,
						(input: unknown): input is Record<string, T> => {
							return (
								is$Object(input) &&
								entries(input).every(
									([key, value]) => is$String(key) && typeChecker(value),
								)
							);
						},
					);
					dictionaryDefinitionStore.set(checker, definition);
					return checker;
				}),
			},
			definition: {
				get: () => cloneDefinition<D>(definition) as D,
			},
		},
	);
	return typeChecker;
}

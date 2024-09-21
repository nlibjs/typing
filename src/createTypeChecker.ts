/* eslint-disable func-style */
import { cacheResult } from "./cacheResult.private.ts";
import { cloneDefinition } from "./cloneDefinition.ts";
import {
	arrayDefinitionStore,
	dictionaryDefinitionStore,
	optionalDefinitionStore,
} from "./definition.private.ts";
import type {
	Definition,
	DefinitionCandidates,
	DefinitionConditions,
	DefinitionEnum,
	DefinitionObject,
	KeyValuePair,
	TypeChecker,
	TypeGuard,
} from "./generics.ts";
import { ModuleError } from "./ModuleError.private.ts";
import {
	is$Array,
	is$Object,
	is$String,
	is$TypeChecker,
} from "./primitive.private.ts";
import { testValue } from "./testValue.ts";

const { entries, defineProperties } = Object as {
	entries: <T>(object: T) => Array<KeyValuePair<T>>;
	defineProperties: <T, P>(
		object: T,
		props: { [K in keyof P]: { get: () => P[K] } | { value: P[K] } },
	) => P & T;
};

export function createTypeChecker<T extends string>(
	definition: RegExp,
): TypeChecker<T, RegExp>;
export function createTypeChecker<T>(
	definition: DefinitionEnum<T>,
): TypeChecker<T, DefinitionEnum<T>>;
export function createTypeChecker<T>(
	definition: DefinitionCandidates<T>,
): TypeChecker<T, DefinitionCandidates<T>>;
export function createTypeChecker<T>(
	definition: DefinitionConditions<T>,
): TypeChecker<T, DefinitionConditions<T>>;
export function createTypeChecker<T>(
	definition: TypeGuard<T>,
): TypeChecker<T, TypeGuard<T>>;
export function createTypeChecker<T>(
	definition: DefinitionObject<T>,
): TypeChecker<T, DefinitionObject<T>>;
// eslint-disable-next-line max-lines-per-function
export function createTypeChecker<T, D extends Definition<T> = Definition<T>>(
	definition: D,
): TypeChecker<T, D> {
	if (is$TypeChecker(definition)) {
		throw new ModuleError({
			code: "UselessWrapping",
			message: `UselessWrapping: (${definition.name})`,
			data: definition,
		});
	}
	const typeChecker = defineProperties(
		(input: unknown): input is T => testValue<T>(input, definition),
		{
			array: {
				get: cacheResult(() => {
					const checker = createTypeChecker<Array<T>>(
						(input: unknown): input is Array<T> =>
							is$Array(input) && input.every((item) => typeChecker(item)),
					);
					defineProperties(checker, {
						derived: { get: () => ["array", definition] },
					});
					arrayDefinitionStore.set(checker, definition);
					return checker;
				}),
			},
			optional: {
				get: cacheResult(() => {
					const checker = createTypeChecker<T | undefined>(
						(input: unknown): input is T | undefined =>
							input === undefined || typeChecker(input),
					);
					defineProperties(checker, {
						derived: { get: () => ["optional", definition] },
					});
					optionalDefinitionStore.set(checker, definition);
					return checker;
				}),
			},
			dictionary: {
				get: cacheResult(() => {
					const checker = createTypeChecker<Record<string, T>>(
						(input: unknown): input is Record<string, T> =>
							is$Object(input) &&
							entries(input).every(
								([key, value]) => is$String(key) && typeChecker(value),
							),
					);
					defineProperties(checker, {
						derived: { get: () => ["dictionary", definition] },
					});
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

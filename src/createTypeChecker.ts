import {cacheResult} from './cacheResult.private';
import {
    arrayDefinitionStore,
    definitionStore,
    dictionaryDefinitionStore,
    isTypeChecker,
    optionalDefinitionStore,
} from './definition.private';
import type {Definition, KeyValuePair, TypeChecker} from './generics';
import {ModuleError} from './ModuleError.private';
import {is$Array, is$Object, is$String} from './primitive.private';
import {testValue} from './testValue';

// eslint-disable-next-line @typescript-eslint/unbound-method
const defineProperties = Object.defineProperties as <T, P>(
    object: T,
    props: {[K in keyof P]: {get: () => P[K]} | {value: P[K]}},
) => P & T;
const entries = Object.entries as <T>(object: T) => KeyValuePair<T>;

// eslint-disable-next-line max-lines-per-function
export const createTypeChecker = <T, N extends string = string>(
    type: N,
    definition: Exclude<Definition<T>, TypeChecker<T>>,
): TypeChecker<T, N> => {
    if (!type) {
        throw new ModuleError({code: 'NoTypeName', data: {type, definition}});
    }
    if (isTypeChecker(definition)) {
        throw new ModuleError({
            code: 'UselessWrapping',
            message: `UselessWrapping: ${type}(${definition.name})`,
            data: {type, definition},
        });
    }
    const typeChecker: TypeChecker<T, N> = defineProperties(
        (input: unknown): input is T => testValue<T>(input, definition),
        {
            type: {value: type},
            name: {value: `is${type}`},
            array: {
                get: cacheResult(() => {
                    const arrayTypeChecker = createTypeChecker<Array<T>, `${N}Array`>(
                        `${type}Array`,
                        (input: unknown): input is Array<T> => {
                            return is$Array(input) && input.every((item) => typeChecker(item));
                        },
                    );
                    arrayDefinitionStore.set(arrayTypeChecker, definition);
                    return arrayTypeChecker;
                }),
            },
            optional: {
                get: cacheResult(() => {
                    const optionalTypeChecker = createTypeChecker(
                        `${type}?`,
                        (input: unknown): input is T | undefined => {
                            return input === undefined || typeChecker(input);
                        },
                    );
                    optionalDefinitionStore.set(optionalTypeChecker, definition);
                    return optionalTypeChecker;
                }),
            },
            dictionary: {
                get: cacheResult(() => {
                    const dictionaryTypeChecker = createTypeChecker(
                        `Record<string, ${type}>`,
                        (input: unknown): input is Record<string, T> => {
                            return is$Object(input) && entries(input).every(([key, value]) => is$String(key) && typeChecker(value));
                        },
                    );
                    dictionaryDefinitionStore.set(dictionaryTypeChecker, definition);
                    return dictionaryTypeChecker;
                }),
            },
        },
    );
    definitionStore.set(typeChecker, definition);
    return typeChecker;
};

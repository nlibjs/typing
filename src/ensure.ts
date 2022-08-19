import type {
    TypeGuard,
    DefinitionEnum,
    DefinitionCandidates,
    DefinitionConditions,
    DefinitionObject,
    TypeChecker,
    Definition,
} from './generics';
import {
    isDefinitionEnum,
    isDefinitionCandidates,
    isDefinitionConditions,
    arrayDefinitionStore,
    optionalDefinitionStore,
} from './definition.private';
import {stringifyDefinition} from './stringifyDefinition.private';
import {ModuleError} from './ModuleError.private';
import {is$Array, is$Function, is$Object, is$RegExp, is$String, is$TypeChecker} from './primitive.private';
import {testValue} from './testValue';

export interface CheckErrorFailedResult {
    path: string,
    input: unknown,
    definition: Definition,
    message: string,
}

export type CheckErrorResult =
| CheckErrorFailedResult
| null;

const keys = Object.keys as <T>(value: T) => Array<keyof T>;

const stringifyError = (error: Exclude<CheckErrorResult, null>): string => [
    `${error.path}: ${error.message}`,
    `actual: ${JSON.stringify(error.input, null, 2)}`,
    `expected: ${stringifyDefinition(error.definition)}`,
].join('\n');

const getDefinitionFunctionError = (
    input: unknown,
    definition: TypeChecker<unknown> | TypeGuard<unknown>,
    path: string,
): CheckErrorResult => definition(input) ? null : {
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
        message: `The input (${input}) isn't in enum (${[...definition].join(', ')}).`,
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
        message: `The input doesn't pass any tests.\n${errors.map(stringifyError).join('\n')}`,
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
                message: `#${index} definition returned an error.\n${stringifyError(error)}`,
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
            message: 'The input is not a map.',
        };
    }
    for (const key of keys(definition)) {
        const error = getTypeError(input[String(key)], definition[key], `${path}.${key}`);
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
    const {length} = input;
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
        } else {
            return {input, definition, path, message: 'The input is not an array.'};
        }
    }
    definition = optionalDefinitionStore.get(typeChecker);
    if (definition) {
        if (input === undefined) {
            return null;
        } else {
            return getTypeError(input, definition, path);
        }
    }
    return getTypeError(input, typeChecker.definition, path);
};

const getRegExpDefinitionError = (
    input: unknown,
    definition: RegExp,
    path: string,
): CheckErrorResult => {
    if (!is$String(input)) {
        return {input, definition, path, message: 'The input is not a string.'};
    }
    if (definition.test(input)) {
        return null;
    }
    return {input, definition, path, message: `"${input}" doesn't match to ${definition}.`};
};

export const getTypeError = (
    input: unknown,
    definition: Definition,
    path: string,
): CheckErrorResult => {
    if (!path) {
        return {input, definition, path, message: 'The type has no path.'};
    }
    if (is$TypeChecker(definition)) {
        return getTypeCheckerDefinitionError(input, definition, path);
    }
    if (is$RegExp(definition)) {
        return getRegExpDefinitionError(input, definition, path);
    }
    if (is$Function(definition)) {
        return getDefinitionFunctionError(input, definition, path);
    }
    if (isDefinitionEnum(definition)) {
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

export const ensure = <T>(
    input: unknown,
    definition: Definition<T>,
    path = '_',
): T => {
    if (testValue(input, definition)) {
        return input;
    }
    const error: CheckErrorResult = getTypeError(input, definition, path) || {
        input,
        definition,
        path,
        message: 'The input doesn\'t match to the definition.',
    };
    throw new ModuleError({
        code: 'TypeCheckError',
        message: stringifyError(error),
        data: error,
    });
};

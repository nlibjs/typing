import {AppError, JSON, Object} from '@nlib/global';
import {
    ValueOf,
    TypeGuardOf,
    DefinitionEnum,
    DefinitionCandidates,
    DefinitionConditions,
    DefinitionArray,
    DefinitionObject,
    TypeChecker,
    Definition,
} from './generics';
import {
    isDefinitionEnumSet,
    isDefinitionCandidatesSet,
    isDefinitionDictionaryClass,
    isDefinitionConditionsSet,
} from './definition';
import {is$Function} from './is$/Function';
import {is$Array} from './is$/Array';
import {is$ObjectLike} from './is$/ObjectLike';
import {stringifyDefinition} from './stringifyDefinition';
import {isTypeChecker} from './createTypeChecker';

export interface CheckErrorFailedResult {
    path: string,
    input: any,
    definition: Definition<any>,
    message: string,
}

const stringifyError = (
    error: CheckErrorFailedResult,
): string => [
    `${error.path}: ${error.message}`,
    `actual: ${JSON.stringify(error.input, null, 2)}`,
    `expected: ${stringifyDefinition(error.definition)}`,
].join('\n');

const checkDefinitionFunctionError = <T>(
    input: any,
    definition: TypeGuardOf<T> | TypeChecker<T>,
    path: string,
): CheckErrorFailedResult | null => definition(input) ? null : {
    input,
    definition,
    path,
    message: 'The definition function returned false.',
};

const checkDefinitionEnumError = <T>(
    input: any,
    definition: DefinitionEnum<T>,
    path: string,
): CheckErrorFailedResult | null => {
    for (const value of definition) {
        if (value === input) {
            return null;
        }
    }
    return {
        input,
        definition,
        path,
        message: 'The input is not found in the enum.',
    };
};

const checkDefinitionCandidatesError = <T>(
    input: any,
    definition: DefinitionCandidates<T>,
    path: string,
): CheckErrorFailedResult | null => {
    const errors: Array<CheckErrorFailedResult> = [];
    for (const candidate of definition) {
        const error = checkError<T>(input, candidate, path);
        if (!error) {
            return null;
        }
        errors.push(error);
    }
    return {
        input,
        definition,
        path,
        message: `All definitions failed.\n${errors.map(stringifyError).join('\n')}`,
    };
};

const checkDefinitionDictionaryError = <T>(
    input: any,
    definition: Definition<T>,
    path: string,
): CheckErrorFailedResult | null => {
    if (!is$ObjectLike(input)) {
        return {
            input,
            definition,
            path,
            message: 'The input is not a map.',
        };
    }
    for (const key of Object.keys(input)) {
        const value = input[key];
        const error = checkError(value, definition, `${path}.${key}`);
        if (error) {
            return error;
        }
    }
    return null;
};

const checkDefinitionConditionsError = <T>(
    input: any,
    definition: DefinitionConditions<T>,
    path: string,
): CheckErrorFailedResult | null => {
    let index = 0;
    for (const candidate of definition) {
        const error = checkError(input, candidate, path);
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

const checkDefinitionArrayError = <T>(
    input: any,
    definition: DefinitionArray<T>,
    path: string,
): CheckErrorFailedResult | null => {
    if (!is$Array(input)) {
        return {
            input,
            definition,
            path,
            message: 'The input is not an array.',
        };
    }
    const tupleLength = definition.length;
    const inputLength = input.length;
    for (let index = 0; index < inputLength; index++) {
        const error = checkError(input[index], definition[index % tupleLength], `${path}.${index}`);
        if (error) {
            return error;
        }
    }
    return null;
};

const checkDefinitionObjectError = <T>(
    input: any,
    definition: DefinitionObject<T>,
    path: string,
): CheckErrorFailedResult | null => {
    if (!is$ObjectLike(input)) {
        return {
            input,
            definition,
            path,
            message: 'The input is not a map.',
        };
    }
    for (const key of Object.keys(definition)) {
        const error = checkError(input[key], definition[key], `${path}.${key}`);
        if (error) {
            return error;
        }
    }
    return null;
};

export const checkError = <T>(
    input: any,
    definition: Definition<T>,
    path?: string,
): CheckErrorFailedResult | null => {
    if (!path) {
        return {input, definition, path: '', message: 'The type has no path.'};
    }
    if (isTypeChecker(definition)) {
        return checkError(input, definition.definition, path);
    }
    if (is$Function(definition)) {
        return checkDefinitionFunctionError<T>(input, definition, path);
    }
    if (isDefinitionEnumSet<T>(definition)) {
        return checkDefinitionEnumError<T>(input, definition, path);
    }
    if (isDefinitionCandidatesSet<T>(definition)) {
        return checkDefinitionCandidatesError<T>(input, definition, path);
    }
    if (isDefinitionDictionaryClass<T>(definition)) {
        return checkDefinitionDictionaryError<ValueOf<T>>(input, definition.definition, path);
    }
    if (isDefinitionConditionsSet<T>(definition)) {
        return checkDefinitionConditionsError<T>(input, definition, path);
    }
    if ((is$Array as TypeGuardOf<DefinitionArray<T>>)(definition)) {
        return checkDefinitionArrayError<T>(input, definition, path);
    }
    return checkDefinitionObjectError<T>(input, definition, path);
};

export const ensure = <T>(
    input: any,
    checker: TypeChecker<T>,
): T => {
    const error = checkError(input, checker.definition, '_');
    if (error) {
        throw new AppError({
            code: 'TypeCheckError',
            message: stringifyError(error),
            data: error,
        });
    }
    return input as T;
};

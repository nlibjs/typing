import {
    Symbol,
    Object,
    defineHiddenReadOnlyProperty,
    defineReadOnlyProperties,
    AppError,
} from '@nlib/global';
import {
    ValueOf,
    ArrayItemOf,
    TypeGuardOf,
    Definition,
    DefinitionArray,
    TypeChecker,
} from './generics';
import {
    isDefinitionEnumSet,
    isDefinitionCandidatesSet,
    isDefinitionDictionarySet,
    isDefinitionConditionsSet,
} from './definition';
import {is$Function} from './is$/Function';
import {is$ObjectLike} from './is$/ObjectLike';
import {is$Array} from './is$/Array';

export const checkCandidates = <T>(
    input: any,
    definitions: Iterable<Definition<T>>,
): boolean => {
    for (const candidate of definitions) {
        if (check<T>(input, candidate)) {
            return true;
        }
    }
    return false;
};

const check = <T>(
    input: any,
    definition: Definition<T>,
): input is T => {
    if ((is$Function as TypeGuardOf<TypeGuardOf<T>>)(definition)) {
        return definition(input);
    }
    if (isDefinitionEnumSet<T>(definition)) {
        for (const value of definition) {
            if (value === input) {
                return true;
            }
        }
        return false;
    }
    if (isDefinitionCandidatesSet<T>(definition)) {
        return checkCandidates<T>(input, definition);
    }
    if (isDefinitionDictionarySet<T>(definition)) {
        if (!is$ObjectLike(input)) {
            return false;
        }
        for (const key of Object.keys(input)) {
            if (!checkCandidates<ValueOf<T>>(input[key], definition)) {
                return false;
            }
        }
        return true;
    }
    if (isDefinitionConditionsSet<T>(definition)) {
        for (const candidate of definition) {
            if (!check<Partial<T>>(input, candidate)) {
                return false;
            }
        }
        return true;
    }
    if ((is$Array as TypeGuardOf<DefinitionArray<T>>)(definition)) {
        if (is$Array(input)) {
            const tupleLength = definition.length;
            return input.every((item, index) => check<ArrayItemOf<T>>(item, definition[index % tupleLength]));
        }
        return false;
    }
    if (is$ObjectLike(input)) {
        for (const key of Object.keys(definition)) {
            if (!check<ValueOf<T>>(input[key], definition[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
};

const IS_TYPE_CHECKER = Symbol('isTypeChecker');
export const createTypeChecker = <T>(
    type: string,
    definition: Definition<T>,
): TypeChecker<T> => {
    if (!type) {
        throw new AppError({
            code: 'NoTypeName',
            message: 'The type has no name.',
            data: {type, definition},
        });
    }
    return defineReadOnlyProperties(
        defineHiddenReadOnlyProperty(
            (input: any): input is T => check<T>(input, definition),
            IS_TYPE_CHECKER,
            true,
        ),
        {type, definition, name: `is${type}`},
    );
};

export const isTypeChecker = (
    input: any,
): input is TypeChecker<any> => is$ObjectLike(input) && IS_TYPE_CHECKER in input;

import type {ValueOf, Definition} from './generics';
import {
    isDefinitionEnumSet,
    isDefinitionCandidatesSet,
    isDefinitionConditionsSet,
} from './definition.private';
import {is$Object, is$String, is$RegExp} from './primitive.private';

const keys = Object.keys as <T>(value: T) => Array<keyof T>;

export const testValue = <T>(input: unknown, definition: Definition<T>): input is T => {
    if (typeof definition === 'function') {
        return definition(input);
    }
    if (is$RegExp(definition)) {
        return is$String(input) && definition.test(input);
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
        for (const candidate of definition) {
            if (testValue<T>(input, candidate)) {
                return true;
            }
        }
        return false;
    }
    if (isDefinitionConditionsSet<T>(definition)) {
        for (const candidate of definition) {
            if (!testValue<Partial<T>>(input, candidate)) {
                return false;
            }
        }
        return true;
    }
    if (is$Object(input)) {
        for (const key of keys(definition)) {
            if (!testValue<ValueOf<T>>(input[String(key)], definition[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
};

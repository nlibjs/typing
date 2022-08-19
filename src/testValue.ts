import type {Definition} from './generics';
import {
    isDefinitionEnum,
    isDefinitionCandidates,
    isDefinitionConditions,
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
    if (isDefinitionEnum(definition)) {
        return definition.has(input as T);
    }
    if (isDefinitionCandidates(definition)) {
        for (const candidate of definition) {
            if (testValue(input, candidate)) {
                return true;
            }
        }
        return false;
    }
    if (isDefinitionConditions(definition)) {
        for (const candidate of definition) {
            if (!testValue(input, candidate)) {
                return false;
            }
        }
        return true;
    }
    if (is$Object(input)) {
        for (const key of keys(definition)) {
            if (!testValue(input[key as string], definition[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
};

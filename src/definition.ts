import {Set} from '@nlib/global';
import {
    ValueOf,
    Definition,
    DefinitionEnum,
    DefinitionCandidates,
    DefinitionConditions,
    DefinitionDictionary,
} from './generics';

export class DefinitionEnumSet<T> extends Set<T> implements DefinitionEnum<T> {}
export class DefinitionCandidatesSet<T> extends Set<Definition<T>> implements DefinitionCandidates<T> {}
export class DefinitionConditionsSet<T> extends Set<Definition<Partial<T>>> implements DefinitionConditions<T> {}
export class DefinitionDictionarySet<T> extends Set<Definition<ValueOf<T>>> implements DefinitionDictionary<T> {}

export const isDefinitionEnumSet = <T>(input: Definition<T>): input is DefinitionEnum<T> => input instanceof DefinitionEnumSet;
export const isDefinitionCandidatesSet = <T>(input: Definition<T>): input is DefinitionCandidates<T> => input instanceof DefinitionCandidatesSet;
export const isDefinitionConditionsSet = <T>(input: Definition<T>): input is DefinitionConditions<T> => input instanceof DefinitionConditionsSet;
export const isDefinitionDictionarySet = <T>(input: Definition<T>): input is DefinitionDictionary<T> => input instanceof DefinitionDictionarySet;

export const definition = {
    enum: <T>(...data: Array<T>): DefinitionEnumSet<T> => {
        return new DefinitionEnumSet<T>(data);
    },
    some: <T>(...data: Array<Definition<any>>): DefinitionCandidatesSet<T> => {
        return new DefinitionCandidatesSet<T>(data);
    },
    every: <T>(...data: Array<Definition<any>>): DefinitionConditionsSet<T> => {
        return new DefinitionConditionsSet<T>(data);
    },
    dictionary: <T>(...data: Array<Definition<ValueOf<T>>>): DefinitionDictionarySet<T> => {
        return new DefinitionDictionarySet<T>(data);
    },
};

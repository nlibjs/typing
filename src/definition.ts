import {Set} from '@nlib/global';
import {
    ValueOf,
    Definition,
    DefinitionEnum as IEnum,
    DefinitionCandidates as ICandidates,
    DefinitionConditions as IConditions,
    DefinitionDictionary as IDictionary,
} from './generics';

export class DefinitionEnum<T> extends Set<T> implements IEnum<T> {}
export class DefinitionCandidates<T> extends Set<Definition<T>> implements ICandidates<T> {}
export class DefinitionConditions<T> extends Set<Definition<Partial<T>>> implements IConditions<T> {}
export class DefinitionDictionary<T> extends Set<Definition<ValueOf<T>>> implements IDictionary<T> {}

export const isDefinitionEnum = <T>(input: Definition<T>): input is IEnum<T> => input instanceof DefinitionEnum;
export const isDefinitionCandidates = <T>(input: Definition<T>): input is ICandidates<T> => input instanceof DefinitionCandidates;
export const isDefinitionConditions = <T>(input: Definition<T>): input is IConditions<T> => input instanceof DefinitionConditions;
export const isDefinitionDictionary = <T>(input: Definition<T>): input is IDictionary<T> => input instanceof DefinitionDictionary;

export const definition = {
    enum: <T>(...data: Array<T>): DefinitionEnum<T> => {
        return new DefinitionEnum<T>(data);
    },
    some: <T>(...data: Array<Definition<any>>): DefinitionCandidates<T> => {
        return new DefinitionCandidates<T>(data);
    },
    every: <T>(...data: Array<Definition<any>>): DefinitionConditions<T> => {
        return new DefinitionConditions<T>(data);
    },
    dictionary: <T>(...data: Array<Definition<ValueOf<T>>>): DefinitionDictionary<T> => {
        return new DefinitionDictionary<T>(data);
    },
};

import {DefinitionCandidatesSet, DefinitionConditionsSet, DefinitionEnumSet} from './definition.private';
import type {Definition} from './generics';

export const definition = {
    enum: <T>(...data: Array<T>): DefinitionEnumSet<T> => {
        return new DefinitionEnumSet<T>(data);
    },
    some: <T>(...data: Array<Definition<T>>): DefinitionCandidatesSet<T> => {
        return new DefinitionCandidatesSet<T>(data);
    },
    every: <T>(...data: Array<Definition<T>>): DefinitionConditionsSet<T> => {
        return new DefinitionConditionsSet<T>(data);
    },
};

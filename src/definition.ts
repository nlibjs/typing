import {DefinitionCandidatesSet, DefinitionConditionsSet, DefinitionEnumSet, isDefinitionCandidatesSet, isDefinitionConditionsSet} from './definition.private';
import type {Definition} from './generics';

export const definition = {
    enum: <T>(...values: Array<T>): DefinitionEnumSet<T> => {
        return new DefinitionEnumSet<T>(values);
    },
    some: <T>(...definitions: Array<Definition<T>>): DefinitionCandidatesSet<T> => {
        const set = new DefinitionCandidatesSet<T>();
        for (const d1 of definitions) {
            for (const d2 of isDefinitionCandidatesSet(d1) ? [...d1] : [d1]) {
                set.add(d2);
            }
        }
        return set;
    },
    every: <T>(...definitions: Array<Definition<T>>): DefinitionConditionsSet<T> => {
        const set = new DefinitionConditionsSet<T>();
        for (const d1 of definitions) {
            for (const d2 of isDefinitionConditionsSet(d1) ? [...d1] : [d1]) {
                set.add(d2);
            }
        }
        return set;
    },
};

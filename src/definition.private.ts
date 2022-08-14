import type {
    Definition,
    DefinitionEnum,
    DefinitionCandidates,
    DefinitionConditions,
    TypeChecker,
} from './generics';

export class DefinitionEnumSet<T> extends Set<T> implements DefinitionEnum<T> {}
export class DefinitionCandidatesSet<T> extends Set<Definition<T>> implements DefinitionCandidates<T> {}
export class DefinitionConditionsSet<T> extends Set<Definition<Partial<T>>> implements DefinitionConditions<T> {}

export const isDefinitionEnumSet = <T>(input: Definition<T>): input is DefinitionEnum<T> => input instanceof DefinitionEnumSet;
export const isDefinitionCandidatesSet = <T>(input: Definition<T>): input is DefinitionCandidates<T> => input instanceof DefinitionCandidatesSet;
export const isDefinitionConditionsSet = <T>(input: Definition<T>): input is DefinitionConditions<T> => input instanceof DefinitionConditionsSet;

export const arrayDefinitionStore = new WeakMap<TypeChecker<unknown>, Definition>();
export const optionalDefinitionStore = new WeakMap<TypeChecker<unknown>, Definition>();
export const dictionaryDefinitionStore = new WeakMap<TypeChecker<unknown>, Definition>();

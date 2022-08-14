/* eslint-disable func-style */
import {DefinitionCandidatesSet, DefinitionConditionsSet, DefinitionEnumSet, isDefinitionCandidatesSet, isDefinitionConditionsSet, isDefinitionEnumSet} from './definition.private';
import type {DefinitionCandidates, DefinitionConditions, DefinitionEnum, DefinitionObject, TypeGuard} from './generics';
import {is$RegExp} from './primitive.private';

export function cloneDefinition(definition: RegExp): RegExp;
export function cloneDefinition<T>(definition: DefinitionEnum<T>): DefinitionEnum<T>;
export function cloneDefinition<T>(definition: DefinitionCandidates<T>): DefinitionCandidates<T>;
export function cloneDefinition<T>(definition: DefinitionConditions<T>): DefinitionConditions<T>;
export function cloneDefinition<T>(definition: TypeGuard<T>): TypeGuard<T>;
export function cloneDefinition<T>(definition: DefinitionObject<T>): DefinitionObject<T>;
export function cloneDefinition<T>(definition: DefinitionCandidates<T> | DefinitionConditions<T> | DefinitionEnum<T> | DefinitionObject<T> | RegExp | TypeGuard<T>) {
    if (typeof definition === 'function') {
        return definition;
    }
    if (is$RegExp(definition)) {
        return new RegExp(definition);
    }
    if (isDefinitionEnumSet(definition)) {
        return new DefinitionEnumSet(definition);
    }
    if (isDefinitionCandidatesSet(definition)) {
        return new DefinitionCandidatesSet(definition);
    }
    if (isDefinitionConditionsSet(definition)) {
        return new DefinitionConditionsSet(definition);
    }
    return {...definition};
}

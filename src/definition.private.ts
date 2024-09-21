import {
	DefinitionCandidates,
	DefinitionConditions,
	DefinitionEnum,
} from "./generics.ts";
import type { Definition, TypeChecker } from "./generics.ts";

export const arrayDefinitionStore = new WeakMap<
	TypeChecker<unknown>,
	Definition
>();
export const optionalDefinitionStore = new WeakMap<
	TypeChecker<unknown>,
	Definition
>();
export const dictionaryDefinitionStore = new WeakMap<
	TypeChecker<unknown>,
	Definition
>();

export const isDefinitionEnum = <T>(
	input: Definition<T>,
): input is DefinitionEnum<T> => input instanceof DefinitionEnum;
export const isDefinitionCandidates = <T>(
	input: Definition<T>,
): input is DefinitionCandidates<T> => input instanceof DefinitionCandidates;
export const isDefinitionConditions = <T>(
	input: Definition<T>,
): input is DefinitionConditions<T> => input instanceof DefinitionConditions;

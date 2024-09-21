import {
	isDefinitionCandidates,
	isDefinitionConditions,
	isDefinitionEnum,
} from "./definition.private.ts";
import {
	DefinitionCandidates,
	DefinitionConditions,
	DefinitionEnum,
} from "./generics.ts";
import type { DefinitionObject, TypeGuard } from "./generics.ts";
import { is$RegExp } from "./primitive.private.ts";

export function cloneDefinition(definition: RegExp): RegExp;
export function cloneDefinition<T>(
	definition: DefinitionEnum<T>,
): DefinitionEnum<T>;
export function cloneDefinition<T>(
	definition: DefinitionCandidates<T>,
): DefinitionCandidates<T>;
export function cloneDefinition<T>(
	definition: DefinitionConditions<T>,
): DefinitionConditions<T>;
export function cloneDefinition<T>(definition: TypeGuard<T>): TypeGuard<T>;
export function cloneDefinition<T>(
	definition: DefinitionObject<T>,
): DefinitionObject<T>;
export function cloneDefinition<T>(
	definition:
		| DefinitionCandidates<T>
		| DefinitionConditions<T>
		| DefinitionEnum<T>
		| DefinitionObject<T>
		| RegExp
		| TypeGuard<T>,
) {
	if (typeof definition === "function") {
		return definition;
	}
	if (is$RegExp(definition)) {
		return new RegExp(definition);
	}
	if (isDefinitionEnum(definition)) {
		return new DefinitionEnum(definition);
	}
	if (isDefinitionCandidates(definition)) {
		return new DefinitionCandidates(definition);
	}
	if (isDefinitionConditions(definition)) {
		return new DefinitionConditions(definition);
	}
	return { ...definition };
}

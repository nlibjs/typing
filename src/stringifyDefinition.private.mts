import type { Definition } from "./generics.mjs";
import {
	isDefinitionEnum,
	isDefinitionCandidates,
	isDefinitionConditions,
} from "./definition.private.mjs";
import { is$Function, is$TypeChecker } from "./primitive.private.mjs";

const keys = Object.keys as <T>(value: T) => Array<keyof T>;

export const stringifyDefinition = <T,>(
	definition: Definition<T>,
	indent = "",
	ancestors: Array<Definition<T>> = [],
): string => [...stringify(definition, indent, ancestors)].join("").trim();

const stringify = function* (
	definition: Definition,
	indent: string,
	ancestors: Array<Definition>,
): Generator<string> {
	if (ancestors.includes(definition)) {
		yield `${indent}(circular)\n`;
	} else if (is$TypeChecker(definition)) {
		yield `${indent}${definition.type}\n`;
	} else if (is$Function(definition)) {
		yield `${indent}${definition.toString()}`;
	} else if (isDefinitionEnum<unknown>(definition)) {
		yield `${indent}${[...definition]
			.map((value) => JSON.stringify(value))
			.join("|")}`;
	} else if (isDefinitionCandidates(definition)) {
		yield* stringifyIterableDefinitions(definition, indent, ancestors, "Some");
	} else if (isDefinitionConditions(definition)) {
		yield* stringifyIterableDefinitions(definition, indent, ancestors, "Every");
	} else {
		yield `${indent}{\n`;
		const itemIndent = `${indent}  `;
		for (const key of keys(definition)) {
			yield `${itemIndent}${String(key)}: ${stringifyDefinition(
				definition[key],
				itemIndent,
				concat(ancestors, definition),
			)},\n`;
		}
		yield `${indent}}\n`;
	}
};

const concat = <T,>(
	ancestors: Array<Definition<T>>,
	definition: Definition<T>,
): Array<Definition<T>> => {
	const result = ancestors.slice();
	result[result.length] = definition;
	return result;
};

const stringifyIterableDefinitions = function* <T>(
	definitions: Set<Definition<T>>,
	indent: string,
	ancestors: Array<Definition<T>>,
	prefix: string,
	open = "{",
	close = "}",
): Generator<string> {
	yield `${indent}${prefix} ${open}\n`;
	const itemIndent = `${indent}  `;
	const nextAncestors = concat(ancestors, definitions);
	for (const definition of definitions) {
		yield `${itemIndent}${stringifyDefinition(
			definition,
			itemIndent,
			nextAncestors,
		)},\n`;
	}
	yield `${indent}${close}\n`;
};

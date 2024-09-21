import type { Callable, Definition } from "./generics.ts";
import {
	isDefinitionEnum,
	isDefinitionCandidates,
	isDefinitionConditions,
} from "./definition.private.ts";
import { is$Function, is$TypeChecker } from "./primitive.private.ts";

const keys = Object.keys as <T>(value: T) => Array<keyof T>;

// biome-ignore lint/complexity/noUselessTypeConstraint: to suppress ts(7060)
export const stringifyDefinition = <T extends unknown>(
	definition: Definition<T>,
	indent = "",
	ancestors: Array<Definition<T>> = [],
	functionIdMap = new Map<Callable, number>(),
): string =>
	[...stringify(definition, indent, ancestors, functionIdMap)].join("").trim();

const stringify = function* (
	definition: Definition,
	indent: string,
	ancestors: Array<Definition>,
	functionIdMap: Map<Callable, number>,
): Generator<string> {
	const itemIndent = `${indent}  `;
	if (ancestors.includes(definition)) {
		yield `${indent}(circular)\n`;
	} else if (is$TypeChecker(definition)) {
		const { derived } = definition;
		if (derived) {
			switch (derived[0]) {
				case "array":
					yield `${indent}Array<`;
					break;
				case "dictionary":
					yield `${indent}Record<string, `;
					break;
				case "optional":
					yield `${indent}Optional<`;
					break;
				default:
					throw new Error(`UnexpectedDerivedType: ${derived[0]}`);
			}
			yield [
				...stringify(
					derived[1],
					itemIndent,
					concat(ancestors, definition),
					functionIdMap,
				),
			]
				.join("")
				.trim();
			yield `${indent}>\n`;
		} else {
			yield* stringify(
				definition.definition,
				indent,
				concat(ancestors, definition),
				functionIdMap,
			);
		}
	} else if (is$Function(definition)) {
		if (!functionIdMap.has(definition)) {
			functionIdMap.set(definition, functionIdMap.size);
		}
		const functionId = functionIdMap.get(definition);
		yield `${indent}${definition.name || `T${functionId}`}\n`;
	} else if (isDefinitionEnum<unknown>(definition)) {
		yield `${indent}${[...definition].map((value) => JSON.stringify(value)).join("|")}`;
	} else if (isDefinitionCandidates(definition)) {
		yield* stringifyIterableDefinitions(
			definition,
			indent,
			ancestors,
			functionIdMap,
			"Some",
		);
	} else if (isDefinitionConditions(definition)) {
		yield* stringifyIterableDefinitions(
			definition,
			indent,
			ancestors,
			functionIdMap,
			"Every",
		);
	} else {
		yield `${indent}{\n`;
		for (const key of keys(definition)) {
			yield `${itemIndent}${String(key)}: ${stringifyDefinition<unknown>(
				definition[key],
				itemIndent,
				concat(ancestors, definition),
				functionIdMap,
			)},\n`;
		}
		yield `${indent}}\n`;
	}
};

// biome-ignore lint/complexity/noUselessTypeConstraint: to suppress ts(7060)
const concat = <T extends unknown>(
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
	functionIdMap: Map<Callable, number>,
	prefix: string,
	open = "{",
	close = "}",
): Generator<string> {
	yield `${indent}${prefix} ${open}\n`;
	const itemIndent = `${indent}  `;
	const nextAncestors = concat<T>(ancestors, definitions);
	for (const definition of definitions) {
		yield `${itemIndent}${stringifyDefinition<T>(definition, itemIndent, nextAncestors, functionIdMap)},\n`;
	}
	yield `${indent}${close}\n`;
};

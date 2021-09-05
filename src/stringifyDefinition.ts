import type {Definition} from './generics';
import {
    isDefinitionEnumSet,
    isDefinitionCandidatesSet,
    isDefinitionConditionsSet,
} from './definition.private';
import {isTypeChecker} from './is/TypeChecker';
import {is$Function} from './is.private';

const keys = Object.keys as <T>(value: T) => Array<keyof T>;

const concat = (
    ancestors: Array<Definition>,
    definition: Definition,
): Array<Definition> => {
    const result = ancestors.slice();
    result[result.length] = definition;
    return result;
};

const stringifyIterableDefinitions = function* (
    definitions: Iterable<Definition>,
    indent: string,
    ancestors: Array<Definition>,
    prefix: string,
    open = '{',
    close = '}',
): Generator<string> {
    yield `${indent}${prefix} ${open}\n`;
    const itemIndent = `${indent}  `;
    const nextAncestors = concat(ancestors, definitions);
    for (const definition of definitions) {
        yield `${itemIndent}${stringifyDefinition(definition, itemIndent, nextAncestors)},\n`;
    }
    yield `${indent}${close}\n`;
};

const stringify = function* (
    definition: Definition,
    indent: string,
    ancestors: Array<Definition>,
): Generator<string> {
    if (ancestors.includes(definition)) {
        yield `${indent}(circular)\n`;
    } else if (isTypeChecker(definition)) {
        yield `${indent}${definition.type}\n`;
    } else if (is$Function(definition)) {
        yield `${indent}${definition.toString()}`;
    } else if (isDefinitionEnumSet(definition)) {
        yield `${indent}${[...definition].map((value) => JSON.stringify(value)).join('|')}`;
    } else if (isDefinitionCandidatesSet(definition)) {
        yield* stringifyIterableDefinitions(definition, indent, ancestors, 'Some');
    } else if (isDefinitionConditionsSet(definition)) {
        yield* stringifyIterableDefinitions(definition, indent, ancestors, 'Every');
    } else {
        yield `${indent}{\n`;
        const itemIndent = `${indent}  `;
        for (const key of keys(definition)) {
            yield `${itemIndent}${String(key)}: ${stringifyDefinition(definition[key], itemIndent, concat(ancestors, definition))},\n`;
        }
        yield `${indent}}\n`;
    }
};

export const stringifyDefinition = (
    definition: Definition,
    indent = '',
    ancestors: Array<Definition> = [],
): string => [...stringify(definition, indent, ancestors)].join('').trim();

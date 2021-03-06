import {JSON, Object} from '@nlib/global';
import {
    TypeGuardOf,
    DefinitionArray,
    Definition,
} from './generics';
import {
    isDefinitionEnumSet,
    isDefinitionCandidatesSet,
    isDefinitionDictionaryClass,
    isDefinitionConditionsSet,
} from './definition';
import {is$Function} from './is$/Function';
import {is$Array} from './is$/Array';
import {isTypeChecker} from './createTypeChecker';

const concat = (
    ancestors: Array<Definition<any>>,
    definition: Definition<any>,
): Array<Definition<any>> => {
    const result = ancestors.slice();
    result[result.length] = definition;
    return result;
};

const stringifyIterableDefinitions = function* (
    definitions: Iterable<Definition<any>>,
    indent: string,
    ancestors: Array<Definition<any>>,
    prefix: string,
    open = '{',
    close = '}',
) {
    yield `${indent}${prefix} ${open}\n`;
    const itemIndent = `${indent}  `;
    const nextAncestors = concat(ancestors, definitions);
    for (const definition of definitions) {
        yield `${itemIndent}${stringifyDefinition(definition, itemIndent, nextAncestors)},\n`;
    }
    yield `${indent}${close}\n`;
};

const stringify = function* (
    definition: Definition<any>,
    indent: string,
    ancestors: Array<Definition<any>>,
): Generator<string> {
    if (ancestors.includes(definition)) {
        yield `${indent}(circular)\n`;
    } else if (isTypeChecker(definition)) {
        yield `${indent}${definition.type}\n`;
    } else if (is$Function(definition)) {
        yield `${indent}${definition.toString()}`;
    } else if (isDefinitionEnumSet<any>(definition)) {
        yield `${indent}${[...definition].map((value) => JSON.stringify(value)).join('|')}`;
    } else if (isDefinitionCandidatesSet<any>(definition)) {
        yield* stringifyIterableDefinitions(definition, indent, ancestors, 'Some');
    } else if (isDefinitionDictionaryClass<any>(definition)) {
        yield 'Dictionary: ';
        yield* stringify(definition.definition, indent, ancestors);
    } else if (isDefinitionConditionsSet<any>(definition)) {
        yield* stringifyIterableDefinitions(definition, indent, ancestors, 'Every');
    } else if ((is$Array as TypeGuardOf<DefinitionArray<any>>)(definition)) {
        yield* stringifyIterableDefinitions(definition, indent, ancestors, '', '[', ']');
    } else {
        yield `${indent}{\n`;
        const itemIndent = `${indent}  `;
        for (const key of Object.keys(definition)) {
            yield `${itemIndent}${key}: ${stringifyDefinition(definition[key], itemIndent, concat(ancestors, definition))},\n`;
        }
        yield `${indent}}\n`;
    }
};

export const stringifyDefinition = (
    definition: Definition<any>,
    indent = '',
    ancestors: Array<Definition<any>> = [],
): string => [...stringify(definition, indent, ancestors)].join('').trim();

import {testFunction} from '@nlib/test';
import {definition} from './definition';
import type {Definition} from './generics';
import {isString} from './is/String';
import {isUUID} from './is/UUID';
import {stringifyDefinition} from './stringifyDefinition.private';

const isNumber = (input: unknown) => typeof input === 'number';
testFunction(stringifyDefinition, [isNumber], '(input) => typeof input === \'number\'');
testFunction(stringifyDefinition, [isString], 'String');
testFunction(stringifyDefinition, [definition.enum<number | string>(1, '2')], '1|"2"');
testFunction(
    stringifyDefinition,
    [{id: isString, name: isString}],
    [
        '{',
        '  id: String,',
        '  name: String,',
        '}',
    ].join('\n'),
);
testFunction(stringifyDefinition, [isString.dictionary], 'Record<string, String>');
testFunction(
    stringifyDefinition,
    [definition.every({id: isString}, {id: isUUID})],
    [
        'Every {',
        '  {',
        '    id: String,',
        '  },',
        '  {',
        '    id: UUID,',
        '  },',
        '}',
    ].join('\n'),
);
testFunction(
    stringifyDefinition,
    [definition.some({id: isString}, {id: isUUID})],
    [
        'Some {',
        '  {',
        '    id: String,',
        '  },',
        '  {',
        '    id: UUID,',
        '  },',
        '}',
    ].join('\n'),
);
const def: Record<string, Definition> = {key1: isString};
def.key2 = def;
testFunction(
    stringifyDefinition,
    [def],
    [
        '{',
        '  key1: String,',
        '  key2: (circular),',
        '}',
    ].join('\n'),
);

import {testFunction} from '@nlib/test';
import {definition} from './definition';
import type {Definition} from './generics';
import {isString} from './is/String';
import {isUUID} from './is/UUID';
import {stringifyDefinition} from './stringifyDefinition';

testFunction(stringifyDefinition, {
    input: (input: unknown) => typeof input === 'number',
    expected: '(input) => typeof input === \'number\'',
});
testFunction(stringifyDefinition, {
    input: isString,
    expected: 'String',
});
testFunction(stringifyDefinition, {
    input: definition.enum<number | string>(1, '2'),
    expected: '1|"2"',
});
testFunction(stringifyDefinition, {
    input: {
        id: isString,
        name: isString,
    },
    expected: [
        '{',
        '  id: String,',
        '  name: String,',
        '}',
    ].join('\n'),
});
testFunction(stringifyDefinition, {
    input: isString.dictionary,
    expected: 'Record<string, String>',
});
testFunction(stringifyDefinition, {
    input: definition.every({id: isString}, {id: isUUID}),
    expected: [
        'Every {',
        '  {',
        '    id: String,',
        '  },',
        '  {',
        '    id: UUID,',
        '  },',
        '}',
    ].join('\n'),
});
testFunction(stringifyDefinition, {
    input: definition.some({id: isString}, {id: isUUID}),
    expected: [
        'Some {',
        '  {',
        '    id: String,',
        '  },',
        '  {',
        '    id: UUID,',
        '  },',
        '}',
    ].join('\n'),
});
const def: Record<string, Definition> = {key1: isString};
def.key2 = def;
testFunction(stringifyDefinition, {
    input: def,
    expected: [
        '{',
        '  key1: String,',
        '  key2: (circular),',
        '}',
    ].join('\n'),
});

import {testFunction} from '@nlib/test';
import {stringifyDefinition} from './stringifyDefinition';
import {isString} from './is/String';
// import {definition} from './definition';
// import {isBoolean} from './is/Boolean';
// import {isUUID} from './is/UUID';

// testFunction(stringifyDefinition, {
//     input: (input: unknown) => typeof input === 'number',
//     expected: '(input) => typeof input === \'number\'',
// });
testFunction(stringifyDefinition, {
    input: isString,
    expected: 'String',
});
// testFunction(stringifyDefinition, {
//     input: definition.enum<number | string>(1, '2'),
//     expected: '1|"2"',
// });
// testFunction(stringifyDefinition, {
//     input: {
//         id: isString,
//         name: isString,
//     },
//     expected: [
//         '{',
//         '  id: String,',
//         '  name: String,',
//         '}',
//     ].join('\n'),
// });
// testFunction(stringifyDefinition, {
//     input: [isString, isBoolean],
//     expected: [
//         '[',
//         '  String,',
//         '  Boolean,',
//         ']',
//     ].join('\n'),
// });
// testFunction(stringifyDefinition, {
//     input: isString.dictionary,
//     expected: 'Dictionary: String',
// });
// testFunction(stringifyDefinition, {
//     input: definition.every({id: isString}, {id: isUUID}),
//     expected: [
//         'Every {',
//         '  {',
//         '    id: String,',
//         '  },',
//         '  {',
//         '    id: UUID,',
//         '  },',
//         '}',
//     ].join('\n'),
// });
// testFunction(stringifyDefinition, {
//     input: definition.some({id: isString}, {id: isUUID}),
//     expected: [
//         'Some {',
//         '  {',
//         '    id: String,',
//         '  },',
//         '  {',
//         '    id: UUID,',
//         '  },',
//         '}',
//     ].join('\n'),
// });

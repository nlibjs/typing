import ava from 'ava';
import {testFunction} from '@nlib/test';
import {isString} from './is/String';
import {createTypeChecker} from './createTypeChecker';
import {definition} from './definition';
import {isNull} from './is/Null';
import {is$String} from './primitive.private';

testFunction(createTypeChecker, {
    parameters: ['', is$String],
    error: {code: 'NoTypeName'},
});

const isEnum = createTypeChecker('Enum', definition.enum(1, 2));
testFunction(isEnum, {input: 1, expected: true});
testFunction(isEnum, {input: 2, expected: true});
testFunction(isEnum, {input: 3, expected: false});

const isSome = createTypeChecker('Some', definition.some(isString, isNull));
testFunction(isSome, {input: '1', expected: true});
testFunction(isSome, {input: null, expected: true});
testFunction(isSome, {input: 1, expected: false});

testFunction(isString.array, {input: ['a', 'b'], expected: true});
testFunction(isString.array, {input: ['a', 1], expected: false});

testFunction(isString.optional, {input: 'a', expected: true});
testFunction(isString.optional, {input: undefined, expected: true});
testFunction(isString.optional, {input: 1, expected: false});

testFunction(isString.dictionary, {input: {a: 'a', b: 'b'}, expected: true});
testFunction(isString.dictionary, {input: {a: 'a', b: 1}, expected: false});

const isEvery = createTypeChecker('Every', definition.every(
    isString,
    (input: unknown): input is string => `${input}`.includes('a'),
));
testFunction(isEvery, {input: '1a', expected: true});
testFunction(isEvery, {input: '11', expected: false});

const isObject = createTypeChecker<{a: string, b: null}>('Object', {
    a: isString,
    b: isNull,
});
testFunction(isObject, {input: {a: '', b: null}, expected: true});
testFunction(isObject, {input: {a: '', b: 1}, expected: false});

const isHexColor = createTypeChecker('HexColor', /^#[0-9a-f]{6}$/);
testFunction(isHexColor, {input: '#000000', expected: true});
testFunction(isHexColor, {input: '#00000g', expected: false});
testFunction(isHexColor, {input: '#abcdef', expected: true});

ava('Cannot pass typeChecker', (t) => {
    t.throws(() => {
        createTypeChecker('String2', isString);
    });
});

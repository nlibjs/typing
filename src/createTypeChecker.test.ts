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

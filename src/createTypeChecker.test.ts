import ava from 'ava';
import {error, testFunction} from '@nlib/test';
import {isString} from './is/String';
import {createTypeChecker} from './createTypeChecker';
import {definition} from './definition';
import {isNull} from './is/Null';
import {is$String} from './primitive.private';

testFunction(createTypeChecker, ['', is$String], error({code: 'NoTypeName'}));

const isEnum = createTypeChecker('Enum', definition.enum(1, 2));
testFunction(isEnum, [1], true);
testFunction(isEnum, [2], true);
testFunction(isEnum, [3], false);

const isSome = createTypeChecker('Some', definition.some(isString, isNull));
testFunction(isSome, ['1'], true);
testFunction(isSome, [null], true);
testFunction(isSome, [1], false);

testFunction(isString.array, [['a', 'b']], true);
testFunction(isString.array, [['a', 1]], false);

testFunction(isString.optional, ['a'], true);
testFunction(isString.optional, [undefined], true);
testFunction(isString.optional, [1], false);

testFunction(isString.dictionary, [{a: 'a', b: 'b'}], true);
testFunction(isString.dictionary, [{a: 'a', b: 1}], false);

const isEvery = createTypeChecker('Every', definition.every(
    isString,
    (input: unknown): input is string => `${input}`.includes('a'),
));
testFunction(isEvery, ['1a'], true);
testFunction(isEvery, ['11'], false);

const isObject = createTypeChecker<{a: string, b: null}>('Object', {
    a: isString,
    b: isNull,
});
testFunction(isObject, [{a: '', b: null}], true);
testFunction(isObject, [{a: '', b: 1}], false);

const isHexColor = createTypeChecker('HexColor', /^#[0-9a-f]{6}$/);
testFunction(isHexColor, ['#000000'], true);
testFunction(isHexColor, ['#00000g'], false);
testFunction(isHexColor, ['#abcdef'], true);

ava('Cannot pass typeChecker', (t) => {
    t.throws(() => {
        createTypeChecker('String2', isString);
    });
});

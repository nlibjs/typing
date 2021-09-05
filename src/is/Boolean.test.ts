import {isBoolean} from './Boolean';
import {testFunction} from '@nlib/test';

testFunction(isBoolean, {input: -Infinity, expected: false});
testFunction(isBoolean, {input: Number.MAX_SAFE_INTEGER * -2, expected: false});
testFunction(isBoolean, {input: -1.1, expected: false});
testFunction(isBoolean, {input: -1, expected: false});
testFunction(isBoolean, {input: 0, expected: false});
testFunction(isBoolean, {input: 1, expected: false});
testFunction(isBoolean, {input: 1.1, expected: false});
testFunction(isBoolean, {input: Number.MAX_SAFE_INTEGER * 2, expected: false});
testFunction(isBoolean, {input: Infinity, expected: false});
testFunction(isBoolean, {input: '', expected: false});
testFunction(isBoolean, {input: 'foo', expected: false});
testFunction(isBoolean, {input: [], expected: false});
testFunction(isBoolean, {input: null, expected: false});
testFunction(isBoolean, {input: true, expected: true});
testFunction(isBoolean, {input: false, expected: true});
testFunction(isBoolean, {input: {}, expected: false});

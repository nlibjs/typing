import {testFunction} from '@nlib/test';
import {isArray} from './Array';

testFunction(isArray, {input: [], expected: true});
testFunction(isArray, {input: [1], expected: true});
testFunction(isArray, {input: 'foo', expected: false});
testFunction(isArray, {input: '', expected: false});
testFunction(isArray, {input: 1, expected: false});
testFunction(isArray, {input: 1.1, expected: false});
testFunction(isArray, {input: null, expected: false});
testFunction(isArray, {input: true, expected: false});
testFunction(isArray, {input: false, expected: false});
testFunction(isArray, {input: {}, expected: false});

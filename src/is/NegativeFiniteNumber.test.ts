import {isNegativeFiniteNumber} from './NegativeFiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isNegativeFiniteNumber, {input: -Infinity, expected: false});
testFunction(isNegativeFiniteNumber, {input: Number.MAX_SAFE_INTEGER * -2, expected: true});
testFunction(isNegativeFiniteNumber, {input: -1.1, expected: true});
testFunction(isNegativeFiniteNumber, {input: -1, expected: true});
testFunction(isNegativeFiniteNumber, {input: 0, expected: false});
testFunction(isNegativeFiniteNumber, {input: 1, expected: false});
testFunction(isNegativeFiniteNumber, {input: 1.1, expected: false});
testFunction(isNegativeFiniteNumber, {input: Number.MAX_SAFE_INTEGER * 2, expected: false});
testFunction(isNegativeFiniteNumber, {input: Infinity, expected: false});
testFunction(isNegativeFiniteNumber, {input: '', expected: false});
testFunction(isNegativeFiniteNumber, {input: 'foo', expected: false});
testFunction(isNegativeFiniteNumber, {input: [], expected: false});
testFunction(isNegativeFiniteNumber, {input: null, expected: false});
testFunction(isNegativeFiniteNumber, {input: true, expected: false});
testFunction(isNegativeFiniteNumber, {input: false, expected: false});
testFunction(isNegativeFiniteNumber, {input: {}, expected: false});

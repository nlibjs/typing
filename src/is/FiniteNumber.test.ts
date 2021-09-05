import {isFiniteNumber} from './FiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isFiniteNumber, {input: -Infinity, expected: false});
testFunction(isFiniteNumber, {input: Number.MAX_SAFE_INTEGER * -2, expected: true});
testFunction(isFiniteNumber, {input: -1.1, expected: true});
testFunction(isFiniteNumber, {input: -1, expected: true});
testFunction(isFiniteNumber, {input: 0, expected: true});
testFunction(isFiniteNumber, {input: 1, expected: true});
testFunction(isFiniteNumber, {input: 1.1, expected: true});
testFunction(isFiniteNumber, {input: Number.MAX_SAFE_INTEGER * 2, expected: true});
testFunction(isFiniteNumber, {input: Infinity, expected: false});
testFunction(isFiniteNumber, {input: '', expected: false});
testFunction(isFiniteNumber, {input: 'foo', expected: false});
testFunction(isFiniteNumber, {input: [], expected: false});
testFunction(isFiniteNumber, {input: null, expected: false});
testFunction(isFiniteNumber, {input: true, expected: false});
testFunction(isFiniteNumber, {input: false, expected: false});
testFunction(isFiniteNumber, {input: {}, expected: false});

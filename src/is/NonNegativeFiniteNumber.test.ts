import {isNonNegativeFiniteNumber} from './NonNegativeFiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isNonNegativeFiniteNumber, {expected: false, input: -Infinity});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: -1.1});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: -1});
testFunction(isNonNegativeFiniteNumber, {expected: true, input: 0});
testFunction(isNonNegativeFiniteNumber, {expected: true, input: 1});
testFunction(isNonNegativeFiniteNumber, {expected: true, input: 1.1});
testFunction(isNonNegativeFiniteNumber, {expected: true, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: Infinity});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: ''});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: 'foo'});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: []});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: null});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: true});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: false});
testFunction(isNonNegativeFiniteNumber, {expected: false, input: {}});

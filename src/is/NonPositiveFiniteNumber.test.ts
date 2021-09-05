import {isNonPositiveFiniteNumber} from './NonPositiveFiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isNonPositiveFiniteNumber, {expected: false, input: -Infinity});
testFunction(isNonPositiveFiniteNumber, {expected: true, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isNonPositiveFiniteNumber, {expected: true, input: -1.1});
testFunction(isNonPositiveFiniteNumber, {expected: true, input: -1});
testFunction(isNonPositiveFiniteNumber, {expected: true, input: 0});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: 1});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: 1.1});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: Infinity});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: ''});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: 'foo'});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: []});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: null});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: true});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: false});
testFunction(isNonPositiveFiniteNumber, {expected: false, input: {}});

import {testFunction} from '@nlib/test';
import {isPositiveFiniteNumber} from './PositiveFiniteNumber';

testFunction(isPositiveFiniteNumber, {expected: false, input: -Infinity});
testFunction(isPositiveFiniteNumber, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isPositiveFiniteNumber, {expected: false, input: -1.1});
testFunction(isPositiveFiniteNumber, {expected: false, input: -1});
testFunction(isPositiveFiniteNumber, {expected: false, input: 0});
testFunction(isPositiveFiniteNumber, {expected: true, input: 1});
testFunction(isPositiveFiniteNumber, {expected: true, input: 1.1});
testFunction(isPositiveFiniteNumber, {expected: true, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isPositiveFiniteNumber, {expected: false, input: Infinity});
testFunction(isPositiveFiniteNumber, {expected: false, input: ''});
testFunction(isPositiveFiniteNumber, {expected: false, input: 'foo'});
testFunction(isPositiveFiniteNumber, {expected: false, input: []});
testFunction(isPositiveFiniteNumber, {expected: false, input: null});
testFunction(isPositiveFiniteNumber, {expected: false, input: true});
testFunction(isPositiveFiniteNumber, {expected: false, input: false});
testFunction(isPositiveFiniteNumber, {expected: false, input: {}});

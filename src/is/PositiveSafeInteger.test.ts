import {testFunction} from '@nlib/test';
import {isPositiveSafeInteger} from './PositiveSafeInteger';

testFunction(isPositiveSafeInteger, {expected: false, input: -Infinity});
testFunction(isPositiveSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isPositiveSafeInteger, {expected: false, input: -1.1});
testFunction(isPositiveSafeInteger, {expected: false, input: -1});
testFunction(isPositiveSafeInteger, {expected: false, input: 0});
testFunction(isPositiveSafeInteger, {expected: true, input: 1});
testFunction(isPositiveSafeInteger, {expected: false, input: 1.1});
testFunction(isPositiveSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isPositiveSafeInteger, {expected: false, input: Infinity});
testFunction(isPositiveSafeInteger, {expected: false, input: ''});
testFunction(isPositiveSafeInteger, {expected: false, input: 'foo'});
testFunction(isPositiveSafeInteger, {expected: false, input: []});
testFunction(isPositiveSafeInteger, {expected: false, input: null});
testFunction(isPositiveSafeInteger, {expected: false, input: true});
testFunction(isPositiveSafeInteger, {expected: false, input: false});
testFunction(isPositiveSafeInteger, {expected: false, input: {}});

import {isNonPositiveSafeInteger} from './NonPositiveSafeInteger';
import {testFunction} from '@nlib/test';

testFunction(isNonPositiveSafeInteger, {expected: false, input: -Infinity});
testFunction(isNonPositiveSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isNonPositiveSafeInteger, {expected: false, input: -1.1});
testFunction(isNonPositiveSafeInteger, {expected: true, input: -1});
testFunction(isNonPositiveSafeInteger, {expected: true, input: 0});
testFunction(isNonPositiveSafeInteger, {expected: false, input: 1});
testFunction(isNonPositiveSafeInteger, {expected: false, input: 1.1});
testFunction(isNonPositiveSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isNonPositiveSafeInteger, {expected: false, input: Infinity});
testFunction(isNonPositiveSafeInteger, {expected: false, input: ''});
testFunction(isNonPositiveSafeInteger, {expected: false, input: 'foo'});
testFunction(isNonPositiveSafeInteger, {expected: false, input: []});
testFunction(isNonPositiveSafeInteger, {expected: false, input: null});
testFunction(isNonPositiveSafeInteger, {expected: false, input: true});
testFunction(isNonPositiveSafeInteger, {expected: false, input: false});
testFunction(isNonPositiveSafeInteger, {expected: false, input: {}});

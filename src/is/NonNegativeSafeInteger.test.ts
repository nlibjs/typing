import {isNonNegativeSafeInteger} from './NonNegativeSafeInteger';
import {testFunction} from '@nlib/test';

testFunction(isNonNegativeSafeInteger, {expected: false, input: -Infinity});
testFunction(isNonNegativeSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isNonNegativeSafeInteger, {expected: false, input: -1.1});
testFunction(isNonNegativeSafeInteger, {expected: false, input: -1});
testFunction(isNonNegativeSafeInteger, {expected: true, input: 0});
testFunction(isNonNegativeSafeInteger, {expected: true, input: 1});
testFunction(isNonNegativeSafeInteger, {expected: false, input: 1.1});
testFunction(isNonNegativeSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isNonNegativeSafeInteger, {expected: false, input: Infinity});
testFunction(isNonNegativeSafeInteger, {expected: false, input: ''});
testFunction(isNonNegativeSafeInteger, {expected: false, input: 'foo'});
testFunction(isNonNegativeSafeInteger, {expected: false, input: []});
testFunction(isNonNegativeSafeInteger, {expected: false, input: null});
testFunction(isNonNegativeSafeInteger, {expected: false, input: true});
testFunction(isNonNegativeSafeInteger, {expected: false, input: false});
testFunction(isNonNegativeSafeInteger, {expected: false, input: {}});

import {isNegativeSafeInteger} from './NegativeSafeInteger';
import {testFunction} from '@nlib/test';

testFunction(isNegativeSafeInteger, {expected: false, input: -Infinity});
testFunction(isNegativeSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isNegativeSafeInteger, {expected: false, input: -1.1});
testFunction(isNegativeSafeInteger, {expected: true, input: -1});
testFunction(isNegativeSafeInteger, {expected: false, input: 0});
testFunction(isNegativeSafeInteger, {expected: false, input: 1});
testFunction(isNegativeSafeInteger, {expected: false, input: 1.1});
testFunction(isNegativeSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isNegativeSafeInteger, {expected: false, input: Infinity});
testFunction(isNegativeSafeInteger, {expected: false, input: ''});
testFunction(isNegativeSafeInteger, {expected: false, input: 'foo'});
testFunction(isNegativeSafeInteger, {expected: false, input: []});
testFunction(isNegativeSafeInteger, {expected: false, input: null});
testFunction(isNegativeSafeInteger, {expected: false, input: true});
testFunction(isNegativeSafeInteger, {expected: false, input: false});
testFunction(isNegativeSafeInteger, {expected: false, input: {}});

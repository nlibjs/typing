import {Infinity, Number} from '@nlib/global';
import {testFunction} from '@nlib/test';
import {isSafeInteger} from './SafeInteger';

testFunction(isSafeInteger, {expected: true, input: 1});
testFunction(isSafeInteger, {expected: false, input: 1.1});
testFunction(isSafeInteger, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isSafeInteger, {expected: false, input: Infinity});
testFunction(isSafeInteger, {expected: false, input: ''});
testFunction(isSafeInteger, {expected: false, input: 'foo'});
testFunction(isSafeInteger, {expected: false, input: []});
testFunction(isSafeInteger, {expected: false, input: null});
testFunction(isSafeInteger, {expected: false, input: true});
testFunction(isSafeInteger, {expected: false, input: false});
testFunction(isSafeInteger, {expected: false, input: {}});

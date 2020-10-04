import {testFunction} from '@nlib/test';
import {isString} from './String';

testFunction(isString, {expected: true, input: ''});
testFunction(isString, {expected: true, input: 'foo'});
testFunction(isString, {expected: false, input: []});
testFunction(isString, {expected: false, input: 1});
testFunction(isString, {expected: false, input: 1.1});
testFunction(isString, {expected: false, input: null});
testFunction(isString, {expected: false, input: true});
testFunction(isString, {expected: false, input: false});
testFunction(isString, {expected: false, input: {}});

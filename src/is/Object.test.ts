import {testFunction} from '@nlib/test';
import {isObject} from './Object';

testFunction(isObject, {expected: false, input: -Infinity});
testFunction(isObject, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isObject, {expected: false, input: -1.1});
testFunction(isObject, {expected: false, input: -1});
testFunction(isObject, {expected: false, input: 0});
testFunction(isObject, {expected: false, input: 1});
testFunction(isObject, {expected: false, input: 1.1});
testFunction(isObject, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isObject, {expected: false, input: Infinity});
testFunction(isObject, {expected: false, input: ''});
testFunction(isObject, {expected: false, input: 'foo'});
testFunction(isObject, {expected: true, input: []});
testFunction(isObject, {expected: false, input: null});
testFunction(isObject, {expected: false, input: true});
testFunction(isObject, {expected: false, input: false});
testFunction(isObject, {expected: true, input: {}});
testFunction(isObject, {expected: true, input: new Date()});
testFunction(isObject, {expected: true, input: new Date('Foo')});
testFunction(isObject, {expected: true, input: () => null});

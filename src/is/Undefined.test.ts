import {isUndefined} from './Undefined';
import {Infinity, Number, Date, undefined} from '@nlib/global';
import {testFunction} from '@nlib/test';

testFunction(isUndefined, {expected: false, input: -Infinity});
testFunction(isUndefined, {expected: false, input: Number.MAX_SAFE_INTEGER * -2});
testFunction(isUndefined, {expected: false, input: -1.1});
testFunction(isUndefined, {expected: false, input: -1});
testFunction(isUndefined, {expected: false, input: 0});
testFunction(isUndefined, {expected: false, input: 1});
testFunction(isUndefined, {expected: false, input: 1.1});
testFunction(isUndefined, {expected: false, input: Number.MAX_SAFE_INTEGER * 2});
testFunction(isUndefined, {expected: false, input: Infinity});
testFunction(isUndefined, {expected: false, input: ''});
testFunction(isUndefined, {expected: false, input: 'foo'});
testFunction(isUndefined, {expected: false, input: []});
testFunction(isUndefined, {expected: false, input: null});
testFunction(isUndefined, {expected: false, input: true});
testFunction(isUndefined, {expected: false, input: false});
testFunction(isUndefined, {expected: false, input: {}});
testFunction(isUndefined, {expected: false, input: new Date()});
testFunction(isUndefined, {expected: false, input: new Date('Foo')});
testFunction(isUndefined, {expected: false, input: () => null});
testFunction(isUndefined, {expected: true, input: undefined});

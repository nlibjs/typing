import {isFunction} from './Function';
import {testFunction} from '@nlib/test';

testFunction(isFunction, [-Infinity], false);
testFunction(isFunction, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isFunction, [-1.1], false);
testFunction(isFunction, [-1], false);
testFunction(isFunction, [0], false);
testFunction(isFunction, [1], false);
testFunction(isFunction, [1.1], false);
testFunction(isFunction, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isFunction, [Infinity], false);
testFunction(isFunction, [''], false);
testFunction(isFunction, ['foo'], false);
testFunction(isFunction, [[]], false);
testFunction(isFunction, [null], false);
testFunction(isFunction, [true], false);
testFunction(isFunction, [false], false);
testFunction(isFunction, [{}], false);
testFunction(isFunction, [new Date()], false);
testFunction(isFunction, [new Date('Foo')], false);
testFunction(isFunction, [() => null], true);

import {isBoolean} from './Boolean';
import {testFunction} from '@nlib/test';

testFunction(isBoolean, [-Infinity], false);
testFunction(isBoolean, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isBoolean, [-1.1], false);
testFunction(isBoolean, [-1], false);
testFunction(isBoolean, [0], false);
testFunction(isBoolean, [1], false);
testFunction(isBoolean, [1.1], false);
testFunction(isBoolean, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isBoolean, [Infinity], false);
testFunction(isBoolean, [''], false);
testFunction(isBoolean, ['foo'], false);
testFunction(isBoolean, [[]], false);
testFunction(isBoolean, [null], false);
testFunction(isBoolean, [true], true);
testFunction(isBoolean, [false], true);
testFunction(isBoolean, [{}], false);

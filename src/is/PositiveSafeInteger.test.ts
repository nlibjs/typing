import {testFunction} from '@nlib/test';
import {isPositiveSafeInteger} from './PositiveSafeInteger';

testFunction(isPositiveSafeInteger, [-Infinity], false);
testFunction(isPositiveSafeInteger, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isPositiveSafeInteger, [-1.1], false);
testFunction(isPositiveSafeInteger, [-1], false);
testFunction(isPositiveSafeInteger, [0], false);
testFunction(isPositiveSafeInteger, [1], true);
testFunction(isPositiveSafeInteger, [1.1], false);
testFunction(isPositiveSafeInteger, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isPositiveSafeInteger, [Infinity], false);
testFunction(isPositiveSafeInteger, [''], false);
testFunction(isPositiveSafeInteger, ['foo'], false);
testFunction(isPositiveSafeInteger, [[]], false);
testFunction(isPositiveSafeInteger, [null], false);
testFunction(isPositiveSafeInteger, [true], false);
testFunction(isPositiveSafeInteger, [false], false);
testFunction(isPositiveSafeInteger, [{}], false);

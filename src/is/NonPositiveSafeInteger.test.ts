import {isNonPositiveSafeInteger} from './NonPositiveSafeInteger';
import {testFunction} from '@nlib/test';

testFunction(isNonPositiveSafeInteger, [-Infinity], false);
testFunction(isNonPositiveSafeInteger, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isNonPositiveSafeInteger, [-1.1], false);
testFunction(isNonPositiveSafeInteger, [-1], true);
testFunction(isNonPositiveSafeInteger, [0], true);
testFunction(isNonPositiveSafeInteger, [1], false);
testFunction(isNonPositiveSafeInteger, [1.1], false);
testFunction(isNonPositiveSafeInteger, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isNonPositiveSafeInteger, [Infinity], false);
testFunction(isNonPositiveSafeInteger, [''], false);
testFunction(isNonPositiveSafeInteger, ['foo'], false);
testFunction(isNonPositiveSafeInteger, [[]], false);
testFunction(isNonPositiveSafeInteger, [null], false);
testFunction(isNonPositiveSafeInteger, [true], false);
testFunction(isNonPositiveSafeInteger, [false], false);
testFunction(isNonPositiveSafeInteger, [{}], false);

import {isNonNegativeSafeInteger} from './NonNegativeSafeInteger';
import {testFunction} from '@nlib/test';

testFunction(isNonNegativeSafeInteger, [-Infinity], false);
testFunction(isNonNegativeSafeInteger, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isNonNegativeSafeInteger, [-1.1], false);
testFunction(isNonNegativeSafeInteger, [-1], false);
testFunction(isNonNegativeSafeInteger, [0], true);
testFunction(isNonNegativeSafeInteger, [1], true);
testFunction(isNonNegativeSafeInteger, [1.1], false);
testFunction(isNonNegativeSafeInteger, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isNonNegativeSafeInteger, [Infinity], false);
testFunction(isNonNegativeSafeInteger, [''], false);
testFunction(isNonNegativeSafeInteger, ['foo'], false);
testFunction(isNonNegativeSafeInteger, [[]], false);
testFunction(isNonNegativeSafeInteger, [null], false);
testFunction(isNonNegativeSafeInteger, [true], false);
testFunction(isNonNegativeSafeInteger, [false], false);
testFunction(isNonNegativeSafeInteger, [{}], false);

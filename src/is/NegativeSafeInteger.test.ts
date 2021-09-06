import {isNegativeSafeInteger} from './NegativeSafeInteger';
import {testFunction} from '@nlib/test';

testFunction(isNegativeSafeInteger, [-Infinity], false);
testFunction(isNegativeSafeInteger, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isNegativeSafeInteger, [-1.1], false);
testFunction(isNegativeSafeInteger, [-1], true);
testFunction(isNegativeSafeInteger, [0], false);
testFunction(isNegativeSafeInteger, [1], false);
testFunction(isNegativeSafeInteger, [1.1], false);
testFunction(isNegativeSafeInteger, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isNegativeSafeInteger, [Infinity], false);
testFunction(isNegativeSafeInteger, [''], false);
testFunction(isNegativeSafeInteger, ['foo'], false);
testFunction(isNegativeSafeInteger, [[]], false);
testFunction(isNegativeSafeInteger, [null], false);
testFunction(isNegativeSafeInteger, [true], false);
testFunction(isNegativeSafeInteger, [false], false);
testFunction(isNegativeSafeInteger, [{}], false);

import {testFunction} from '@nlib/test';
import {isSafeInteger} from './SafeInteger';

testFunction(isSafeInteger, [1], true);
testFunction(isSafeInteger, [1.1], false);
testFunction(isSafeInteger, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isSafeInteger, [Infinity], false);
testFunction(isSafeInteger, [''], false);
testFunction(isSafeInteger, ['foo'], false);
testFunction(isSafeInteger, [[]], false);
testFunction(isSafeInteger, [null], false);
testFunction(isSafeInteger, [true], false);
testFunction(isSafeInteger, [false], false);
testFunction(isSafeInteger, [{}], false);

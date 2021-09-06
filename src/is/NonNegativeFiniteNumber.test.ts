import {isNonNegativeFiniteNumber} from './NonNegativeFiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isNonNegativeFiniteNumber, [-Infinity], false);
testFunction(isNonNegativeFiniteNumber, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isNonNegativeFiniteNumber, [-1.1], false);
testFunction(isNonNegativeFiniteNumber, [-1], false);
testFunction(isNonNegativeFiniteNumber, [0], true);
testFunction(isNonNegativeFiniteNumber, [1], true);
testFunction(isNonNegativeFiniteNumber, [1.1], true);
testFunction(isNonNegativeFiniteNumber, [Number.MAX_SAFE_INTEGER * 2], true);
testFunction(isNonNegativeFiniteNumber, [Infinity], false);
testFunction(isNonNegativeFiniteNumber, [''], false);
testFunction(isNonNegativeFiniteNumber, ['foo'], false);
testFunction(isNonNegativeFiniteNumber, [[]], false);
testFunction(isNonNegativeFiniteNumber, [null], false);
testFunction(isNonNegativeFiniteNumber, [true], false);
testFunction(isNonNegativeFiniteNumber, [false], false);
testFunction(isNonNegativeFiniteNumber, [{}], false);

import {isNegativeFiniteNumber} from './NegativeFiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isNegativeFiniteNumber, [-Infinity], false);
testFunction(isNegativeFiniteNumber, [Number.MAX_SAFE_INTEGER * -2], true);
testFunction(isNegativeFiniteNumber, [-1.1], true);
testFunction(isNegativeFiniteNumber, [-1], true);
testFunction(isNegativeFiniteNumber, [0], false);
testFunction(isNegativeFiniteNumber, [1], false);
testFunction(isNegativeFiniteNumber, [1.1], false);
testFunction(isNegativeFiniteNumber, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isNegativeFiniteNumber, [Infinity], false);
testFunction(isNegativeFiniteNumber, [''], false);
testFunction(isNegativeFiniteNumber, ['foo'], false);
testFunction(isNegativeFiniteNumber, [[]], false);
testFunction(isNegativeFiniteNumber, [null], false);
testFunction(isNegativeFiniteNumber, [true], false);
testFunction(isNegativeFiniteNumber, [false], false);
testFunction(isNegativeFiniteNumber, [{}], false);

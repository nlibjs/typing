import {isNonPositiveFiniteNumber} from './NonPositiveFiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isNonPositiveFiniteNumber, [-Infinity], false);
testFunction(isNonPositiveFiniteNumber, [Number.MAX_SAFE_INTEGER * -2], true);
testFunction(isNonPositiveFiniteNumber, [-1.1], true);
testFunction(isNonPositiveFiniteNumber, [-1], true);
testFunction(isNonPositiveFiniteNumber, [0], true);
testFunction(isNonPositiveFiniteNumber, [1], false);
testFunction(isNonPositiveFiniteNumber, [1.1], false);
testFunction(isNonPositiveFiniteNumber, [Number.MAX_SAFE_INTEGER * 2], false);
testFunction(isNonPositiveFiniteNumber, [Infinity], false);
testFunction(isNonPositiveFiniteNumber, [''], false);
testFunction(isNonPositiveFiniteNumber, ['foo'], false);
testFunction(isNonPositiveFiniteNumber, [[]], false);
testFunction(isNonPositiveFiniteNumber, [null], false);
testFunction(isNonPositiveFiniteNumber, [true], false);
testFunction(isNonPositiveFiniteNumber, [false], false);
testFunction(isNonPositiveFiniteNumber, [{}], false);

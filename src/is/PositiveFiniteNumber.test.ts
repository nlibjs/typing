import {testFunction} from '@nlib/test';
import {isPositiveFiniteNumber} from './PositiveFiniteNumber';

testFunction(isPositiveFiniteNumber, [-Infinity], false);
testFunction(isPositiveFiniteNumber, [Number.MAX_SAFE_INTEGER * -2], false);
testFunction(isPositiveFiniteNumber, [-1.1], false);
testFunction(isPositiveFiniteNumber, [-1], false);
testFunction(isPositiveFiniteNumber, [0], false);
testFunction(isPositiveFiniteNumber, [1], true);
testFunction(isPositiveFiniteNumber, [1.1], true);
testFunction(isPositiveFiniteNumber, [Number.MAX_SAFE_INTEGER * 2], true);
testFunction(isPositiveFiniteNumber, [Infinity], false);
testFunction(isPositiveFiniteNumber, [''], false);
testFunction(isPositiveFiniteNumber, ['foo'], false);
testFunction(isPositiveFiniteNumber, [[]], false);
testFunction(isPositiveFiniteNumber, [null], false);
testFunction(isPositiveFiniteNumber, [true], false);
testFunction(isPositiveFiniteNumber, [false], false);
testFunction(isPositiveFiniteNumber, [{}], false);

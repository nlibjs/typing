import {isFiniteNumber} from './FiniteNumber';
import {testFunction} from '@nlib/test';

testFunction(isFiniteNumber, [-Infinity], false);
testFunction(isFiniteNumber, [Number.MAX_SAFE_INTEGER * -2], true);
testFunction(isFiniteNumber, [-1.1], true);
testFunction(isFiniteNumber, [-1], true);
testFunction(isFiniteNumber, [0], true);
testFunction(isFiniteNumber, [1], true);
testFunction(isFiniteNumber, [1.1], true);
testFunction(isFiniteNumber, [Number.MAX_SAFE_INTEGER * 2], true);
testFunction(isFiniteNumber, [Infinity], false);
testFunction(isFiniteNumber, [''], false);
testFunction(isFiniteNumber, ['foo'], false);
testFunction(isFiniteNumber, [[]], false);
testFunction(isFiniteNumber, [null], false);
testFunction(isFiniteNumber, [true], false);
testFunction(isFiniteNumber, [false], false);
testFunction(isFiniteNumber, [{}], false);

import {testFunction} from '@nlib/test';
import {isArray} from './Array';

testFunction(isArray, [[]], true);
testFunction(isArray, [[1]], true);
testFunction(isArray, ['foo'], false);
testFunction(isArray, [''], false);
testFunction(isArray, [1], false);
testFunction(isArray, [1.1], false);
testFunction(isArray, [null], false);
testFunction(isArray, [true], false);
testFunction(isArray, [false], false);
testFunction(isArray, [{}], false);

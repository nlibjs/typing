import {testFunction} from '@nlib/test';
import {isString} from './String';

testFunction(isString, [''], true);
testFunction(isString, ['foo'], true);
testFunction(isString, [[]], false);
testFunction(isString, [1], false);
testFunction(isString, [1.1], false);
testFunction(isString, [null], false);
testFunction(isString, [true], false);
testFunction(isString, [false], false);
testFunction(isString, [{}], false);

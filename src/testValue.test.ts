import {testFunction} from '@nlib/test';
import {testValue} from './testValue';

testFunction(testValue, [1, null as never], false);

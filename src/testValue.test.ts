import {testFunction} from '@nlib/test';
import {testValue} from './testValue';

testFunction(testValue, {
    parameters: [1, null],
    expected: false,
});

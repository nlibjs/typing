import {testFunction} from '@nlib/test';
import {is$String} from './is$/String';
import {createTypeChecker} from './createTypeChecker';

testFunction(createTypeChecker, {
    parameters: ['', is$String],
    error: {code: 'NoTypeName'},
});

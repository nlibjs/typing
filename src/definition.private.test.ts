import {testFunction} from '@nlib/test';
import {isTypeChecker} from './definition.private';
import {isString} from './is/String';
import {is$String} from './primitive.private';

testFunction(isTypeChecker, {input: is$String, expected: false});
testFunction(isTypeChecker, {input: isString, expected: true});

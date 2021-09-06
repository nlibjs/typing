import {testFunction} from '@nlib/test';
import {isTypeChecker} from './definition.private';
import {isString} from './is/String';
import {is$String} from './primitive.private';

testFunction(isTypeChecker, [is$String], false);
testFunction(isTypeChecker, [isString], true);

import {isString} from './String';
import {testTypeCheckerSuccess, testTypeCheckerFail} from '../testTypeChecker';

testTypeCheckerSuccess(isString, '');
testTypeCheckerSuccess(isString, 'foo');
testTypeCheckerFail(isString, []);
testTypeCheckerFail(isString, 1);
testTypeCheckerFail(isString, 1.1);
testTypeCheckerFail(isString, null);
testTypeCheckerFail(isString, true);
testTypeCheckerFail(isString, false);
testTypeCheckerFail(isString, {});

import {isArray} from './Array';
import {testTypeCheckerSuccess, testTypeCheckerFail} from '../testTypeChecker';

testTypeCheckerSuccess(isArray, []);
testTypeCheckerSuccess(isArray, [1]);
testTypeCheckerFail(isArray, 'foo');
testTypeCheckerFail(isArray, '');
testTypeCheckerFail(isArray, 1);
testTypeCheckerFail(isArray, 1.1);
testTypeCheckerFail(isArray, null);
testTypeCheckerFail(isArray, true);
testTypeCheckerFail(isArray, false);
testTypeCheckerFail(isArray, {});

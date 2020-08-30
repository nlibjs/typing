import {isSafeInteger} from './SafeInteger';
import {testTypeCheckerSuccess, testTypeCheckerFail} from '../testTypeChecker';
import {Infinity, Number} from '@nlib/global';

testTypeCheckerSuccess(isSafeInteger, 1);
testTypeCheckerFail(isSafeInteger, 1.1);
testTypeCheckerFail(isSafeInteger, Number.MAX_SAFE_INTEGER * 2);
testTypeCheckerFail(isSafeInteger, Infinity);
testTypeCheckerFail(isSafeInteger, '');
testTypeCheckerFail(isSafeInteger, 'foo');
testTypeCheckerFail(isSafeInteger, []);
testTypeCheckerFail(isSafeInteger, null);
testTypeCheckerFail(isSafeInteger, true);
testTypeCheckerFail(isSafeInteger, false);
testTypeCheckerFail(isSafeInteger, {});

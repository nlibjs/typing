import {isNonNegativeSafeInteger} from './NonNegativeSafeInteger';
import {testTypeCheckerSuccess, testTypeCheckerFail} from '../testTypeChecker';
import {Infinity, Number} from '@nlib/global';

testTypeCheckerFail(isNonNegativeSafeInteger, -Infinity);
testTypeCheckerFail(isNonNegativeSafeInteger, Number.MAX_SAFE_INTEGER * -2);
testTypeCheckerFail(isNonNegativeSafeInteger, -1.1);
testTypeCheckerFail(isNonNegativeSafeInteger, -1);
testTypeCheckerSuccess(isNonNegativeSafeInteger, 0);
testTypeCheckerSuccess(isNonNegativeSafeInteger, 1);
testTypeCheckerFail(isNonNegativeSafeInteger, 1.1);
testTypeCheckerFail(isNonNegativeSafeInteger, Number.MAX_SAFE_INTEGER * 2);
testTypeCheckerFail(isNonNegativeSafeInteger, Infinity);
testTypeCheckerFail(isNonNegativeSafeInteger, '');
testTypeCheckerFail(isNonNegativeSafeInteger, 'foo');
testTypeCheckerFail(isNonNegativeSafeInteger, []);
testTypeCheckerFail(isNonNegativeSafeInteger, null);
testTypeCheckerFail(isNonNegativeSafeInteger, true);
testTypeCheckerFail(isNonNegativeSafeInteger, false);
testTypeCheckerFail(isNonNegativeSafeInteger, {});

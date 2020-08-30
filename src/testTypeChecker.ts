import ava, {ThrowsExpectation} from 'ava';
import {JSON} from '@nlib/global';
import {TypeChecker} from './generics';
import {ensure} from './ensure';

let count = 0;
export const testTypeCheckerSuccess = <T>(
    typeChecker: TypeChecker<T>,
    input: any,
) => {
    ava(
        [
            `#${++count}`,
            `${typeChecker.name}(${JSON.stringify(input)})`,
            '→ true',
        ].join(' '),
        (t) => {
            t.true(typeChecker(input));
            t.is(ensure(input, typeChecker), input);
        },
    );
};

export const testTypeCheckerFail = <T>(
    typeChecker: TypeChecker<T>,
    input: any,
    expectation?: ThrowsExpectation,
) => {
    ava(
        [
            `#${++count}`,
            `${typeChecker.name}(${JSON.stringify(input)})`,
            '→ false',
        ].join(' '),
        (t) => {
            t.false(typeChecker(input));
            t.throws(() => ensure(input, typeChecker), expectation);
        },
    );
};

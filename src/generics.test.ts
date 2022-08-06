import type {DefinedType, UndefinedAsOptional} from './generics';
import {isPositiveSafeInteger} from './is/PositiveSafeInteger';
import {isString} from './is/String';

test('UndefinedAsOptional', () => {
    interface A1 {
        foo: string,
        bar: number | undefined,
    }
    // const a1: A1 = {foo: 'foo'};
    type A2 = UndefinedAsOptional<A1>;
    const a2: A2 = {foo: 'foo'};
    expect(a2).toBe(a2);
});

test('Defined', () => {
    const definition = {
        foo: isString,
        bar: isPositiveSafeInteger.optional,
    };
    // const a1: A1 = {foo: 'foo'};
    type A2 = DefinedType<typeof definition>;
    const a2: A2 = {foo: 'foo'};
    expect(a2).toBe(a2);
});

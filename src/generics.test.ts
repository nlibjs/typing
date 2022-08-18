import {createTypeChecker} from './createTypeChecker';
import type {DefinedType, GuardedType, Merge, Nominal, TypeGuard, UndefinedAsOptional} from './generics';
import {isPositiveSafeInteger} from './is/PositiveSafeInteger';
import {isString} from './is/String';
import {definition} from './definition';

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
    const definitions = {
        foo: isString,
        bar: isPositiveSafeInteger.optional,
    };
    // const a1: A1 = {foo: 'foo'};
    type A2 = DefinedType<typeof definitions>;
    const a2: A2 = {foo: 'foo'};
    expect(a2).toBe(a2);
});

test('Nominal', () => {
    type Price1 = Nominal<number, 'Price'>;
    const isPrice: TypeGuard<Price1> = (input: unknown): input is Price1 => isPositiveSafeInteger(input);
    /** This should be equal to Price1 */
    type Price2 = GuardedType<typeof isPrice>;
    const productDefinition = {
        price: isPrice,
        name: isString,
        description: isString.optional,
    };
    type Defined = DefinedType<typeof productDefinition>;
    const price = 123 as Price2;
    const product: Defined = {price, name: 'product'};
    expect(product).toBe(product);
});

test('Merge', () => {
    interface Type {
        A: {a: number},
        B: {b: string},
    }
    const c: Merge<Type['A'], Type['B']> = {a: 1, b: '1'};
    expect(c.a).toBe(1);
});

test('DefinedType', () => {
    const isA2 = createTypeChecker('A2', definition.enum<'a2'>('a2'));
    const isA3 = createTypeChecker(
        'A3',
        (input: unknown): input is ['a3'] => Array.isArray(input) && input[0] === 'a3',
    );
    const definitions = {
        a1: {a1: isString.optional},
        a2: {a2: isA2.array},
        a3: {a3: isA3},
    };
    type D = DefinedType<typeof definitions>;
    /** a1 is optional */
    const a: D['a1'] = {};
    expect(a).toBeTruthy();
    const b: D['a2'] = {a2: ['a2']};
    expect(b).toBeTruthy();
    const c: D['a3'] = {a3: ['a3']};
    expect(c).toBeTruthy();
});

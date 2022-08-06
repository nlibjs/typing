import type {DefinedType, GuardedType, Nominal, TypeGuard, UndefinedAsOptional} from './generics';
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

const typeCheckerTestValues = {
    NegativeInfinity: -Infinity,
    NegativeUnsafeInteger: Number.MAX_SAFE_INTEGER * -2,
    NegativeFloat: -1.1,
    NegativeInteger: -1,
    NegativeZero: -1 / Infinity,
    Zero: 0,
    PositiveZero: 1 / Infinity,
    PositiveInteger: 1,
    PositiveFloat: 1.1,
    PositiveUnsafeInteger: Number.MAX_SAFE_INTEGER * 2,
    PositiveIntinify: Infinity,
    NegativeBigInt: -1234567890123456789012345678901234567890n,
    PositiveBigInt: 1234567890123456789012345678901234567890n,
    EmptyString: '',
    NonEmptyString: 'foo',
    NonUUID: '12345678-abcd-ef01-1234-00009999000',
    UUID: '12345678-abcd-ef01-1234-000099990000',
    EmptyArray: [],
    Null: null,
    Undefined: undefined,
    True: true,
    False: false,
    Object: Object.create(null) as unknown,
    ValidDate: new Date(),
    InvalidDate: new Date('Foo'),
    Function: () => null,
    Class: class Foo {
        public foo?: number;
    },
};
type TestKey = keyof typeof typeCheckerTestValues;
export const listCheckerTests = function* (...trueKeys: Array<TestKey>) {
    for (const key of Object.keys(typeCheckerTestValues) as Array<TestKey>) {
        const input = typeCheckerTestValues[key];
        const expected = trueKeys.includes(key);
        yield {key, input, expected};
    }
};

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
    Localhost: 'localhost',
    ExampleDotCom: 'example.com',
    DomainWithHyphenAndDigits: 'foo-1.example.com',
    DomainStartsWithDigits: '1234567domain.example.com',
    InvalidDomainEndsWithHyphen: 'foo1-.example.com',
    InvalidDomainStartsWithDot: '.example.com',
    InvalidDomainEndsWithDot: 'example.com.',
    IPv4: '192.168.0.1',
    Digits64: '0123456789012345678901234567890123456789012345678901234567890123',
    Digits65: '01234567890123456789012345678901234567890123456789012345678901234',
    DigitsSeparatedByDot: '0123456789.0123456789',
    DigitsSeparatedBy2Dots: '0123456789..0123456789',
    EmailAddressLocalPartSymbols: '!#$%&\'*+-/=?^_{|}~`',
    SmallLatin: 'abcdefghijklmnopqrstuvwxyz',
    CapitalLatin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    QuotedSingle: '\'abcdefghijklmnopqrstuvwxyz\'',
    QuotedDouble: '"ABCDEFGHIJKLMNOPQRSTUVWXYZ"',
    EmailAddressNoLocalPart: '@example.com',
    EmailAddress1LocalPart: '1@example.com',
    EmailAddressLong64: '0123456789012345678901234567890123456789012345678901234567890123@example.com',
    EmailAddressLong65: '01234567890123456789012345678901234567890123456789012345678901234@example.com',
    EmailAddressSymbols: '!#$%&\'*+-/=?^_{|}~`@example.com',
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

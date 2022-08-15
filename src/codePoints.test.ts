import {DIGIT_ONE, DIGIT_ZERO, LATIN_CAPITAL_LETTER_A, LATIN_SMALL_LETTER_A, LATIN_SMALL_LETTER_Z, listCodePoints, SPACE, toSmallLatinCodePoint} from './codePoints';

describe(toSmallLatinCodePoint.name, () => {
    const tests: Array<[number, number]> = [
        [DIGIT_ONE, DIGIT_ONE],
        [LATIN_CAPITAL_LETTER_A, LATIN_SMALL_LETTER_A],
        [LATIN_SMALL_LETTER_Z, LATIN_SMALL_LETTER_Z],
    ];
    for (const [input, expected] of tests) {
        test(`${input} → ${expected}`, () => {
            expect(toSmallLatinCodePoint(input)).toBe(expected);
        });
    }
});

describe(listCodePoints.name, () => {
    const tests: Array<[string, Array<number>]> = [
        ['', []],
        ['aA 0', [LATIN_SMALL_LETTER_A, LATIN_CAPITAL_LETTER_A, SPACE, DIGIT_ZERO]],
        ['𠮟る𩸽😭', [0x20B9F, 0x308B, 0x29E3D, 0x1F62D]],
    ];
    for (const [input, expected] of tests) {
        test(`${input} → ${expected.join(',')}`, () => {
            const generator = listCodePoints(input);
            for (const value of expected) {
                expect(generator.next()).toMatchObject({value});
            }
            expect(generator.next()).toMatchObject({done: true, value: undefined});
        });
    }
});

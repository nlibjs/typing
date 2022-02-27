import {createTypeChecker} from '../createTypeChecker';
import {isString} from './String';
import {
    AMPERSAND,
    APOSTROPHE,
    ASTERISK,
    CIRCUMFLEX_ACCENT,
    DOLLAR_SIGN,
    EQUALS_SIGN,
    EXCLAMATION_MARK,
    FULL_STOP,
    GRAVE_ACCENT,
    HYPHEN_MINUS,
    LEFT_CURLY_BRACKET,
    LOW_LINE,
    NUMBER_SIGN,
    PERCENT_SIGN,
    PLUS_SIGN,
    QUESTION_MARK,
    RIGHT_CURLY_BRACKET,
    SOLIDUS,
    TILDE,
    VERTICAL_LINE,
    isDigitCodePoint,
    isSmallLatinCodePoint,
    isCapitalLatinCodePoint,
    listCodePoints,
} from '../codePoints';

/**
 * https://www.rfc-editor.org/rfc/rfc5322.html#section-3.4.1
 * https://gitlab-ce.zipang.in/everholic/monorepo/-/issues/36
 * local-part  = 1*atext *("." 1*atext)
 * atext       = ALPHA / DIGIT / "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" /
 *               "-" / "/" / "=" / "?" / "^" / "_" / "`" / "{" / "|" / "}" / "~"
 */

const allowedNonAlphaNumerics = new Set([
    EXCLAMATION_MARK,
    NUMBER_SIGN,
    DOLLAR_SIGN,
    PERCENT_SIGN,
    AMPERSAND,
    APOSTROPHE,
    ASTERISK,
    PLUS_SIGN,
    HYPHEN_MINUS,
    SOLIDUS,
    EQUALS_SIGN,
    QUESTION_MARK,
    CIRCUMFLEX_ACCENT,
    LOW_LINE,
    GRAVE_ACCENT,
    LEFT_CURLY_BRACKET,
    VERTICAL_LINE,
    RIGHT_CURLY_BRACKET,
    TILDE,
]);

const isAtomText = (codePoint: number): boolean => isSmallLatinCodePoint(codePoint)
|| isCapitalLatinCodePoint(codePoint)
|| isDigitCodePoint(codePoint)
|| allowedNonAlphaNumerics.has(codePoint);

export const isEmailAddressLocalPart = createTypeChecker(
    'EmailAddressLocalPart',
    (input: unknown): input is string => {
        if (!isString(input)) {
            return false;
        }
        const {length} = input;
        if (length === 0 || 64 < length) {
            return false;
        }
        let lastCodePoint = FULL_STOP;
        for (const codePoint of listCodePoints(input)) {
            if (codePoint === FULL_STOP) {
                if (lastCodePoint === FULL_STOP) {
                    return false;
                }
            } else if (!isAtomText(codePoint)) {
                return false;
            }
            lastCodePoint = codePoint;
        }
        if (lastCodePoint === FULL_STOP) {
            return false;
        }
        return true;
    },
);

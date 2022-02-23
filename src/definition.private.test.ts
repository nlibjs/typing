import {isTypeChecker} from './definition.private';
import {isString} from './is/String';
import {is$String} from './primitive.private';

describe(isTypeChecker.name, () => {
    it(`${is$String.name} → false`, () => {
        expect(isTypeChecker(is$String)).toBe(false);
    });
    it(`${isString.name} → true`, () => {
        expect(isTypeChecker(isString)).toBe(true);
    });
});

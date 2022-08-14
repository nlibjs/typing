import {isString} from './is/String';
import {is$String, is$TypeChecker} from './primitive.private';

describe(is$TypeChecker.name, () => {
    it(`${is$String.name} → false`, () => {
        expect(is$TypeChecker(is$String)).toBe(false);
    });
    it(`${isString.name} → true`, () => {
        expect(is$TypeChecker(isString)).toBe(true);
    });
});

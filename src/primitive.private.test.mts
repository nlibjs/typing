import { isString } from './is/String.mjs';
import { is$String, is$TypeChecker } from './primitive.private.mjs';

test(`${is$String.name} → false`, () => {
  expect(is$TypeChecker(is$String)).toBe(false);
});

test(`${isString.name} → true`, () => {
  expect(is$TypeChecker(isString)).toBe(true);
});

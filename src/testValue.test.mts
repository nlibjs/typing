import { testValue } from './testValue.mjs';

test('return false if the definition is null', () => {
  expect(testValue(1, null as never)).toBe(false);
});

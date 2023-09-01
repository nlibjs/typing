import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isNull } from './Null.mjs';

for (const { key, input, expected } of listCheckerTests('Null')) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isNull(input), expected);
  });
}

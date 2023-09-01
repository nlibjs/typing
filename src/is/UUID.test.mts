import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isUUID } from './UUID.mjs';

for (const { key, input, expected } of listCheckerTests('UUID')) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isUUID(input), expected);
  });
}

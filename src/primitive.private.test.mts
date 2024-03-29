import { test } from 'node:test';
import * as assert from 'node:assert';
import { isString } from './is/String.mjs';
import { is$String, is$TypeChecker } from './primitive.private.mjs';

test(`${is$String.name} → false`, () => {
  assert.equal(is$TypeChecker(is$String), false);
});

test(`${isString.name} → true`, () => {
  assert.equal(is$TypeChecker(isString), true);
});

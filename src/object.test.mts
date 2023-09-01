import { describe, test } from 'node:test';
import * as assert from 'node:assert';
import { entries, keys, values } from './object.mjs';

describe(keys.name, () => {
  test('should return keys of an object', () => {
    const source = { a: 1, b: 2 };
    const result = keys(source);
    assert.deepStrictEqual(result, ['a', 'b']);
  });
  test('should return keys of an array', () => {
    const source = ['a', 'b'];
    const result = keys(source);
    assert.deepStrictEqual(result, ['0', '1']);
  });
});

describe(values.name, () => {
  test('should return values of an object', () => {
    const source = { a: 1, b: 2 };
    const result = values(source);
    assert.deepStrictEqual(result, [1, 2]);
  });
  test('should return values of an array', () => {
    const source = ['a', 'b'];
    const result = values(source);
    assert.deepStrictEqual(result, ['a', 'b']);
  });
});

describe(entries.name, () => {
  test('should return entries of an object', () => {
    const source = { a: 1, b: 2 };
    const result = entries(source);
    assert.deepStrictEqual(result, [
      ['a', 1],
      ['b', 2],
    ]);
  });
  test('should return entries of an array', () => {
    const source = ['a', 'b'];
    const result = entries(source);
    assert.deepStrictEqual(result, [
      ['0', 'a'],
      ['1', 'b'],
    ]);
  });
});

import { test } from 'node:test';
import * as assert from 'node:assert';
import { isString } from './is/String.mjs';
import { createTypeChecker } from './createTypeChecker.mjs';
import { definition } from './definition.mjs';
import { isNull } from './is/Null.mjs';
import { is$String } from './primitive.private.mjs';
import { testValue } from './testValue.mjs';

test('Name is required', () => {
  assert.throws(() => createTypeChecker('', is$String), { code: 'NoTypeName' });
});

test('should create a checker from values', () => {
  const isEnum = createTypeChecker('Enum', definition.enum(1, 2));
  assert.equal(isEnum(1), true);
  assert.equal(isEnum(2), true);
  assert.equal(isEnum(3), false);
});

test('should create an array checker', () => {
  assert.equal(isString.array(['a', 'b']), true);
  assert.equal(isString.array(['a', 1]), false);
});

test('should create an optional checker', () => {
  assert.equal(isString.optional('a'), true);
  assert.equal(isString.optional(undefined), true);
  assert.equal(isString.optional(1), false);
});

test('should create a dictionary checker', () => {
  assert.equal(isString.dictionary({ a: 'a', b: 'b' }), true);
  assert.equal(isString.dictionary({ a: 'a', b: 1 }), false);
});

test('should create a OR checker from definitions', () => {
  const isSome = createTypeChecker('Some', definition.some(isString, isNull));
  assert.equal(isSome('1'), true);
  assert.equal(isSome(null), true);
  assert.equal(isSome(1), false);
});

test('should create a AND checker from definitions', () => {
  const isEvery = createTypeChecker(
    'Every',
    definition.every(isString, (input: unknown): input is string =>
      `${input}`.includes('a'),
    ),
  );
  assert.equal(isEvery('1a'), true);
  assert.equal(isEvery('11'), false);
  assert.equal(isEvery(['a']), false);
});

test('should create an object checker from definitions', () => {
  const isObject = createTypeChecker('Object', {
    a: isString,
    b: isNull,
  });
  assert.equal(isObject({ a: '', b: null }), true);
  assert.equal(isObject({ a: '', b: 1 }), false);
  assert.equal(isObject(1), false);
});

test('should create a RegExp checker from definitions', () => {
  const isHexColor = createTypeChecker('HexColor', /^#[0-9a-f]{6}$/);
  assert.equal(isHexColor('#000000'), true);
  assert.equal(isHexColor('#00000g'), false);
  assert.equal(isHexColor('#abcdef'), true);
});

test('cannot clone a checker', () => {
  assert.throws(() => createTypeChecker('String2', isString));
});

test('should exposes its definition', () => {
  const isFoo = createTypeChecker('Foo', {
    a: is$String,
    b: is$String,
  });
  const d = { ...isFoo.definition };
  assert.equal(testValue('', d.a), true);
  assert.equal(testValue('', d.b), true);
  assert.equal(testValue(1, d.a), false);
  assert.equal(testValue(1, d.b), false);
});

test('should clone definition', () => {
  const isFoo = createTypeChecker('Foo', {
    a: is$String,
    b: is$String,
  });
  assert.notEqual(isFoo.definition, isFoo.definition);
});

test('should be able to extend definition', () => {
  const isFoo = createTypeChecker('Foo', {
    a: is$String,
    b: is$String,
  });
  const isBar = createTypeChecker('Bar', {
    ...isFoo.definition,
    c: is$String,
    d: is$String,
  });
  const d = { ...isBar.definition };
  assert.equal(testValue('', d.a), true);
  assert.equal(testValue('', d.b), true);
  assert.equal(testValue('', d.c), true);
  assert.equal(testValue('', d.d), true);
  assert.equal(testValue(1, d.a), false);
  assert.equal(testValue(1, d.b), false);
  assert.equal(testValue(1, d.c), false);
  assert.equal(testValue(1, d.d), false);
});

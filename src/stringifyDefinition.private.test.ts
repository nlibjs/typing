import { definition } from './definition';
import type { Definition } from './generics';
import { isString } from './is/String';
import { isUUID } from './is/UUID';
import { stringifyDefinition } from './stringifyDefinition.private';

const isNumber = (input: unknown) => typeof input === 'number';

test('should stringify the function', () => {
  expect(stringifyDefinition(isNumber)).toBe(
    "(input) => typeof input === 'number'",
  );
});

test('should return the name', () => {
  expect(stringifyDefinition(isString)).toBe('String');
});

test('should stringify enum', () => {
  expect(stringifyDefinition(definition.enum<number | string>(1, '2'))).toBe(
    '1|"2"',
  );
});

test('should stringify an object definition', () => {
  expect(stringifyDefinition({ id: isString, name: isString })).toBe(
    ['{', '  id: String,', '  name: String,', '}'].join('\n'),
  );
});

test('should stringify dictionary', () => {
  expect(stringifyDefinition(isString.dictionary)).toBe(
    'Record<string, String>',
  );
});

test('should stringify AND', () => {
  expect(
    stringifyDefinition(definition.every({ id: isString }, { id: isUUID })),
  ).toBe(
    [
      'Every {',
      '  {',
      '    id: String,',
      '  },',
      '  {',
      '    id: UUID,',
      '  },',
      '}',
    ].join('\n'),
  );
});

test('should stringify OR', () => {
  expect(
    stringifyDefinition(definition.some({ id: isString }, { id: isUUID })),
  ).toBe(
    [
      'Some {',
      '  {',
      '    id: String,',
      '  },',
      '  {',
      '    id: UUID,',
      '  },',
      '}',
    ].join('\n'),
  );
});

test('should stringify circular definition', () => {
  const def: Record<string, Definition> = { key1: isString };
  def.key2 = def;
  expect(stringifyDefinition(def)).toBe(
    ['{', '  key1: String,', '  key2: (circular),', '}'].join('\n'),
  );
});

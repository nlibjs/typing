import { entries, keys, values } from './object.mjs';

describe(keys.name, () => {
  it('should return keys of an object', () => {
    const source = { a: 1, b: 2 };
    const result = keys(source);
    expect(result).toMatchObject(['a', 'b']);
  });
  it('should return keys of an array', () => {
    const source = ['a', 'b'];
    const result = keys(source);
    expect(result).toMatchObject(['0', '1']);
  });
});

describe(values.name, () => {
  it('should return values of an object', () => {
    const source = { a: 1, b: 2 };
    const result = values(source);
    expect(result).toMatchObject([1, 2]);
  });
  it('should return values of an array', () => {
    const source = ['a', 'b'];
    const result = values(source);
    expect(result).toMatchObject(['a', 'b']);
  });
});

describe(entries.name, () => {
  it('should return entries of an object', () => {
    const source = { a: 1, b: 2 };
    const result = entries(source);
    expect(result).toMatchObject([
      ['a', 1],
      ['b', 2],
    ]);
  });
  it('should return entries of an array', () => {
    const source = ['a', 'b'];
    const result = entries(source);
    expect(result).toMatchObject([
      ['0', 'a'],
      ['1', 'b'],
    ]);
  });
});

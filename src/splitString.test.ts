import { splitString } from './splitString';

test('csv', () => {
  const input = 'a, b c , d,';
  const generator = splitString(input, ',');
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 0, end: 1, next: 2, value: 'a' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 2, end: 7, next: 8, value: ' b c ' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 8, end: 10, next: 11, value: ' d' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 11, end: 11, next: 12, value: '' },
  });
  expect(generator.next()).toMatchObject({
    done: true,
    value: undefined,
  });
});

test('separate by ==', () => {
  const input = 'a== b c == d====';
  const generator = splitString(input, '==');
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 0, end: 1, next: 3, value: 'a' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 3, end: 8, next: 10, value: ' b c ' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 10, end: 12, next: 14, value: ' d' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 14, end: 14, next: 16, value: '' },
  });
  expect(generator.next()).toMatchObject({
    done: false,
    value: { start: 16, end: 16, next: 18, value: '' },
  });
  expect(generator.next()).toMatchObject({
    done: true,
    value: undefined,
  });
});

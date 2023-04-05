import {ensure} from './ensure';
import {isString} from './is/String';

test('throw an error if 3rd is undefined', () => {
    const regexp = /^TypeCheckError/;
    expect(() => ensure(1, isString)).toThrowError(regexp);
    expect(() => ensure(1, isString, undefined)).toThrowError(regexp);
});

test('return the fallback value if 3rd is given', () => {
    expect(ensure(1, isString, 2)).toBe(2);
    expect(ensure('1', isString, 2)).toBe('1');
});

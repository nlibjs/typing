import {isString} from './is/String';
import {createTypeChecker} from './createTypeChecker';
import {definition} from './definition';
import {isNull} from './is/Null';
import {is$String} from './primitive.private';

const catchError = (fn: () => void) => {
    try {
        fn();
        return null;
    } catch (error) {
        return error;
    }
};

describe(createTypeChecker.name, () => {
    it('Name is required', () => {
        expect(catchError(() => {
            createTypeChecker('', is$String);
        })).toMatchObject({code: 'NoTypeName'});
    });
    it('should create a checker from values', () => {
        const isEnum = createTypeChecker('Enum', definition.enum(1, 2));
        expect(isEnum(1)).toBe(true);
        expect(isEnum(2)).toBe(true);
        expect(isEnum(3)).toBe(false);
    });
    it('should create an array checker', () => {
        expect(isString.array(['a', 'b'])).toBe(true);
        expect(isString.array(['a', 1])).toBe(false);
    });
    it('should create an optional checker', () => {
        expect(isString.optional('a')).toBe(true);
        expect(isString.optional(undefined)).toBe(true);
        expect(isString.optional(1)).toBe(false);
    });
    it('should create a dictionary checker', () => {
        expect(isString.dictionary({a: 'a', b: 'b'})).toBe(true);
        expect(isString.dictionary({a: 'a', b: 1})).toBe(false);
    });
    it('should create a OR checker from definitions', () => {
        const isSome = createTypeChecker('Some', definition.some(isString, isNull));
        expect(isSome('1')).toBe(true);
        expect(isSome(null)).toBe(true);
        expect(isSome(1)).toBe(false);
    });
    it('should create a AND checker from definitions', () => {
        const isEvery = createTypeChecker('Every', definition.every(
            isString,
            (input: unknown): input is string => `${input}`.includes('a'),
        ));
        expect(isEvery('1a')).toBe(true);
        expect(isEvery('11')).toBe(false);
        expect(isEvery(['a'])).toBe(false);
    });
    it('should create an object checker from definitions', () => {
        const isObject = createTypeChecker('Object', {
            a: isString,
            b: isNull,
        });
        expect(isObject({a: '', b: null})).toBe(true);
        expect(isObject({a: '', b: 1})).toBe(false);
        expect(isObject(1)).toBe(false);
    });
    it('should create a RegExp checker from definitions', () => {
        const isHexColor = createTypeChecker('HexColor', /^#[0-9a-f]{6}$/);
        expect(isHexColor('#000000')).toBe(true);
        expect(isHexColor('#00000g')).toBe(false);
        expect(isHexColor('#abcdef')).toBe(true);
    });
    it('cannot clone a checker', () => {
        expect(() => {
            createTypeChecker('String2', isString);
        }).toThrow();
    });
});

import {listCheckerTests} from './tests.private';
import {isObject} from './Object';

for (const {key, input, expected} of listCheckerTests(
    'EmptyArray',
    'Object',
    'InvalidDate',
    'ValidDate',
    'Function',
    'Class',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Float32Array',
    'Float64Array',
    'BigUint64Array',
    'BigInt64Array',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isObject(input)).toBe(expected);
    });
}

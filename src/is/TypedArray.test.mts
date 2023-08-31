import { listCheckerTests } from './tests.private.mjs';
import {
  isBigInt64Array,
  isBigUint64Array,
  isFloat32Array,
  isFloat64Array,
  isInt16Array,
  isInt32Array,
  isInt8Array,
  isUint16Array,
  isUint32Array,
  isUint8Array,
  isUint8ClampedArray,
} from './TypedArray.mjs';

describe(isUint8Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Uint8Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isUint8Array(input)).toBe(expected);
    });
  }
});

describe(isUint8ClampedArray.name, () => {
  for (const { key, input, expected } of listCheckerTests(
    'Uint8ClampedArray',
  )) {
    test(`${key} → ${expected}`, () => {
      expect(isUint8ClampedArray(input)).toBe(expected);
    });
  }
});

describe(isUint16Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Uint16Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isUint16Array(input)).toBe(expected);
    });
  }
});

describe(isUint32Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Uint32Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isUint32Array(input)).toBe(expected);
    });
  }
});

describe(isInt8Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Int8Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isInt8Array(input)).toBe(expected);
    });
  }
});

describe(isInt16Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Int16Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isInt16Array(input)).toBe(expected);
    });
  }
});

describe(isInt32Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Int32Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isInt32Array(input)).toBe(expected);
    });
  }
});

describe(isFloat32Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Float32Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isFloat32Array(input)).toBe(expected);
    });
  }
});

describe(isFloat64Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('Float64Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isFloat64Array(input)).toBe(expected);
    });
  }
});

describe(isBigUint64Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('BigUint64Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isBigUint64Array(input)).toBe(expected);
    });
  }
});

describe(isBigInt64Array.name, () => {
  for (const { key, input, expected } of listCheckerTests('BigInt64Array')) {
    test(`${key} → ${expected}`, () => {
      expect(isBigInt64Array(input)).toBe(expected);
    });
  }
});

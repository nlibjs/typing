import { createTypeChecker } from '../createTypeChecker';
import { getType } from '../getType';

export const isUint8Array = createTypeChecker(
  'Uint8Array',
  (input: unknown): input is Uint8Array => getType(input) === 'Uint8Array',
);

export const isUint8ClampedArray = createTypeChecker(
  'Uint8ClampedArray',
  (input: unknown): input is Uint8ClampedArray =>
    getType(input) === 'Uint8ClampedArray',
);

export const isUint16Array = createTypeChecker(
  'Uint16Array',
  (input: unknown): input is Uint16Array => getType(input) === 'Uint16Array',
);

export const isUint32Array = createTypeChecker(
  'Uint32Array',
  (input: unknown): input is Uint32Array => getType(input) === 'Uint32Array',
);

export const isInt8Array = createTypeChecker(
  'Int8Array',
  (input: unknown): input is Int8Array => getType(input) === 'Int8Array',
);

export const isInt16Array = createTypeChecker(
  'Int16Array',
  (input: unknown): input is Int16Array => getType(input) === 'Int16Array',
);

export const isInt32Array = createTypeChecker(
  'Int32Array',
  (input: unknown): input is Int32Array => getType(input) === 'Int32Array',
);

export const isFloat32Array = createTypeChecker(
  'Float32Array',
  (input: unknown): input is Float32Array => getType(input) === 'Float32Array',
);

export const isFloat64Array = createTypeChecker(
  'Float64Array',
  (input: unknown): input is Float64Array => getType(input) === 'Float64Array',
);

export const isBigUint64Array = createTypeChecker(
  'BigUint64Array',
  (input: unknown): input is BigUint64Array =>
    getType(input) === 'BigUint64Array',
);

export const isBigInt64Array = createTypeChecker(
  'BigInt64Array',
  (input: unknown): input is BigInt64Array =>
    getType(input) === 'BigInt64Array',
);

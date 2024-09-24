import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";

export const isUint8Array: TypeChecker<Uint8Array> =
	typeChecker<Uint8Array>("Uint8Array");
export const isUint8ClampedArray: TypeChecker<Uint8ClampedArray> =
	typeChecker<Uint8ClampedArray>("Uint8ClampedArray");
export const isUint16Array: TypeChecker<Uint16Array> =
	typeChecker<Uint16Array>("Uint16Array");
export const isUint32Array: TypeChecker<Uint32Array> =
	typeChecker<Uint32Array>("Uint32Array");
export const isInt8Array: TypeChecker<Int8Array> =
	typeChecker<Int8Array>("Int8Array");
export const isInt16Array: TypeChecker<Int16Array> =
	typeChecker<Int16Array>("Int16Array");
export const isInt32Array: TypeChecker<Int32Array> =
	typeChecker<Int32Array>("Int32Array");
export const isFloat32Array: TypeChecker<Float32Array> =
	typeChecker<Float32Array>("Float32Array");
export const isFloat64Array: TypeChecker<Float64Array> =
	typeChecker<Float64Array>("Float64Array");
export const isBigUint64Array: TypeChecker<BigUint64Array> =
	typeChecker<BigUint64Array>("BigUint64Array");
export const isBigInt64Array: TypeChecker<BigInt64Array> =
	typeChecker<BigInt64Array>("BigInt64Array");

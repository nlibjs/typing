import { getType } from "../getType.ts";
import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { isNonNegativeSafeInteger } from "./NonNegativeSafeInteger.ts";

const typedArrayChecker = <T>(name: string): TypeChecker<T> => {
	const functionName = `is${name}`;
	return typeChecker(
		{
			[functionName]: (input: unknown): input is T =>
				ArrayBuffer.isView(input) &&
				"BYTES_PER_ELEMENT" in input &&
				isNonNegativeSafeInteger(input.BYTES_PER_ELEMENT) &&
				getType(input) === name,
		}[functionName],
	);
};

export const isUint8Array: TypeChecker<Uint8Array> =
	typedArrayChecker<Uint8Array>("Uint8Array");
export const isUint8ClampedArray: TypeChecker<Uint8ClampedArray> =
	typedArrayChecker<Uint8ClampedArray>("Uint8ClampedArray");
export const isUint16Array: TypeChecker<Uint16Array> =
	typedArrayChecker<Uint16Array>("Uint16Array");
export const isUint32Array: TypeChecker<Uint32Array> =
	typedArrayChecker<Uint32Array>("Uint32Array");
export const isInt8Array: TypeChecker<Int8Array> =
	typedArrayChecker<Int8Array>("Int8Array");
export const isInt16Array: TypeChecker<Int16Array> =
	typedArrayChecker<Int16Array>("Int16Array");
export const isInt32Array: TypeChecker<Int32Array> =
	typedArrayChecker<Int32Array>("Int32Array");
export const isFloat32Array: TypeChecker<Float32Array> =
	typedArrayChecker<Float32Array>("Float32Array");
export const isFloat64Array: TypeChecker<Float64Array> =
	typedArrayChecker<Float64Array>("Float64Array");
export const isBigUint64Array: TypeChecker<BigUint64Array> =
	typedArrayChecker<BigUint64Array>("BigUint64Array");
export const isBigInt64Array: TypeChecker<BigInt64Array> =
	typedArrayChecker<BigInt64Array>("BigInt64Array");

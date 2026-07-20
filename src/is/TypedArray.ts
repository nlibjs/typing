import { getType } from "../getType.ts";
import { narrow } from "../narrow.ts";
import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker } from "../types.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isNonNegativeSafeInteger } from "./NonNegativeSafeInteger.ts";

interface TypedArrayView extends ArrayBufferView {
	readonly BYTES_PER_ELEMENT: number;
}

const isTypedArray: TypeChecker<TypedArrayView> = typeChecker(
	(input: unknown): input is TypedArrayView =>
		ArrayBuffer.isView(input) &&
		"BYTES_PER_ELEMENT" in input &&
		isNonNegativeSafeInteger(input.BYTES_PER_ELEMENT),
	"TypedArray",
);

const typedArrayChecker = <T extends TypedArrayView>(
	name: string,
): TypeChecker<T> => {
	const functionName = `is${name}`;
	const checker = typeChecker(
		narrow<TypedArrayView, T>(
			isTypedArray,
			(input): input is T => getType(input) === name,
			() => [
				{
					code: ValidationIssueCode.NarrowingFailed,
					expected: `a ${name}`,
				},
			],
		),
		name,
	);
	Object.defineProperty(checker, "name", {
		value: functionName,
		configurable: true,
	});
	return checker;
};

/**
 * @param input A value to check.
 * @returns A type predicate for `Uint8Array`.
 */
export const isUint8Array: TypeChecker<Uint8Array> =
	typedArrayChecker<Uint8Array>("Uint8Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `Uint8ClampedArray`.
 */
export const isUint8ClampedArray: TypeChecker<Uint8ClampedArray> =
	typedArrayChecker<Uint8ClampedArray>("Uint8ClampedArray");

/**
 * @param input A value to check.
 * @returns A type predicate for `Uint16Array`.
 */
export const isUint16Array: TypeChecker<Uint16Array> =
	typedArrayChecker<Uint16Array>("Uint16Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `Uint32Array`.
 */
export const isUint32Array: TypeChecker<Uint32Array> =
	typedArrayChecker<Uint32Array>("Uint32Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `Int8Array`.
 */
export const isInt8Array: TypeChecker<Int8Array> =
	typedArrayChecker<Int8Array>("Int8Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `Int16Array`.
 */
export const isInt16Array: TypeChecker<Int16Array> =
	typedArrayChecker<Int16Array>("Int16Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `Int32Array`.
 */
export const isInt32Array: TypeChecker<Int32Array> =
	typedArrayChecker<Int32Array>("Int32Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `BigInt64Array`.
 */
export const isFloat32Array: TypeChecker<Float32Array> =
	typedArrayChecker<Float32Array>("Float32Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `Float64Array`.
 */
export const isFloat64Array: TypeChecker<Float64Array> =
	typedArrayChecker<Float64Array>("Float64Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `BigInt64Array`.
 */
export const isBigUint64Array: TypeChecker<BigUint64Array> =
	typedArrayChecker<BigUint64Array>("BigUint64Array");

/**
 * @param input A value to check.
 * @returns A type predicate for `BigInt64Array`.
 */
export const isBigInt64Array: TypeChecker<BigInt64Array> =
	typedArrayChecker<BigInt64Array>("BigInt64Array");

import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { getType } from "../getType.ts";

export const isUint8Array: TypeChecker<
	Uint8Array,
	TypeGuard<Uint8Array>
> = createTypeChecker(
	(input: unknown): input is Uint8Array => getType(input) === "Uint8Array",
);

export const isUint8ClampedArray: TypeChecker<
	Uint8ClampedArray,
	TypeGuard<Uint8ClampedArray>
> = createTypeChecker(
	(input: unknown): input is Uint8ClampedArray =>
		getType(input) === "Uint8ClampedArray",
);

export const isUint16Array: TypeChecker<
	Uint16Array,
	TypeGuard<Uint16Array>
> = createTypeChecker(
	(input: unknown): input is Uint16Array => getType(input) === "Uint16Array",
);

export const isUint32Array: TypeChecker<
	Uint32Array,
	TypeGuard<Uint32Array>
> = createTypeChecker(
	(input: unknown): input is Uint32Array => getType(input) === "Uint32Array",
);

export const isInt8Array: TypeChecker<
	Int8Array,
	TypeGuard<Int8Array>
> = createTypeChecker(
	(input: unknown): input is Int8Array => getType(input) === "Int8Array",
);

export const isInt16Array: TypeChecker<
	Int16Array,
	TypeGuard<Int16Array>
> = createTypeChecker(
	(input: unknown): input is Int16Array => getType(input) === "Int16Array",
);

export const isInt32Array: TypeChecker<
	Int32Array,
	TypeGuard<Int32Array>
> = createTypeChecker(
	(input: unknown): input is Int32Array => getType(input) === "Int32Array",
);

export const isFloat32Array: TypeChecker<
	Float32Array,
	TypeGuard<Float32Array>
> = createTypeChecker(
	(input: unknown): input is Float32Array => getType(input) === "Float32Array",
);

export const isFloat64Array: TypeChecker<
	Float64Array,
	TypeGuard<Float64Array>
> = createTypeChecker(
	(input: unknown): input is Float64Array => getType(input) === "Float64Array",
);

export const isBigUint64Array: TypeChecker<
	BigUint64Array,
	TypeGuard<BigUint64Array>
> = createTypeChecker(
	(input: unknown): input is BigUint64Array =>
		getType(input) === "BigUint64Array",
);

export const isBigInt64Array: TypeChecker<
	BigInt64Array,
	TypeGuard<BigInt64Array>
> = createTypeChecker(
	(input: unknown): input is BigInt64Array =>
		getType(input) === "BigInt64Array",
);

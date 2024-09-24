import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
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
} from "./TypedArray.ts";

for (const { key, input, expected } of listCheckerTests("Uint8Array")) {
	test(`(${isUint8Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isUint8Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Uint8ClampedArray")) {
	test(`(${isUint8ClampedArray.name}) ${key} → ${expected}`, () => {
		assert.equal(isUint8ClampedArray(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Uint16Array")) {
	test(`(${isUint16Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isUint16Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Uint32Array")) {
	test(`(${isUint32Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isUint32Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Int8Array")) {
	test(`(${isInt8Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isInt8Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Int16Array")) {
	test(`(${isInt16Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isInt16Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Int32Array")) {
	test(`(${isInt32Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isInt32Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Float32Array")) {
	test(`(${isFloat32Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isFloat32Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("Float64Array")) {
	test(`(${isFloat64Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isFloat64Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("BigUint64Array")) {
	test(`(${isBigUint64Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isBigUint64Array(input), expected);
	});
}

for (const { key, input, expected } of listCheckerTests("BigInt64Array")) {
	test(`(${isBigInt64Array.name}) ${key} → ${expected}`, () => {
		assert.equal(isBigInt64Array(input), expected);
	});
}

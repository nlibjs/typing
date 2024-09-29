import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
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

for (const { name, input, expected } of checkerTestCase("Uint8Array")) {
	test(`(${isUint8Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isUint8Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Uint8ClampedArray")) {
	test(`(${isUint8ClampedArray.name}) ${name} → ${expected}`, () => {
		assert.equal(isUint8ClampedArray(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Uint16Array")) {
	test(`(${isUint16Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isUint16Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Uint32Array")) {
	test(`(${isUint32Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isUint32Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Int8Array")) {
	test(`(${isInt8Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isInt8Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Int16Array")) {
	test(`(${isInt16Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isInt16Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Int32Array")) {
	test(`(${isInt32Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isInt32Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Float32Array")) {
	test(`(${isFloat32Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isFloat32Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("Float64Array")) {
	test(`(${isFloat64Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isFloat64Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("BigUint64Array")) {
	test(`(${isBigUint64Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isBigUint64Array(input), expected);
	});
}

for (const { name, input, expected } of checkerTestCase("BigInt64Array")) {
	test(`(${isBigInt64Array.name}) ${name} → ${expected}`, () => {
		assert.equal(isBigInt64Array(input), expected);
	});
}

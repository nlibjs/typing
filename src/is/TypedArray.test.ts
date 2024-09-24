import { describe, test } from "node:test";
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

describe(isUint8Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Uint8Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isUint8Array(input), expected);
		});
	}
});

describe(isUint8ClampedArray.name, () => {
	for (const { key, input, expected } of listCheckerTests(
		"Uint8ClampedArray",
	)) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isUint8ClampedArray(input), expected);
		});
	}
});

describe(isUint16Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Uint16Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isUint16Array(input), expected);
		});
	}
});

describe(isUint32Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Uint32Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isUint32Array(input), expected);
		});
	}
});

describe(isInt8Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Int8Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isInt8Array(input), expected);
		});
	}
});

describe(isInt16Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Int16Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isInt16Array(input), expected);
		});
	}
});

describe(isInt32Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Int32Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isInt32Array(input), expected);
		});
	}
});

describe(isFloat32Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Float32Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isFloat32Array(input), expected);
		});
	}
});

describe(isFloat64Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("Float64Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isFloat64Array(input), expected);
		});
	}
});

describe(isBigUint64Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("BigUint64Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isBigUint64Array(input), expected);
		});
	}
});

describe(isBigInt64Array.name, () => {
	for (const { key, input, expected } of listCheckerTests("BigInt64Array")) {
		test(`${key} → ${expected}`, () => {
			assert.equal(isBigInt64Array(input), expected);
		});
	}
});

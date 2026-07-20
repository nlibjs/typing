import * as assert from "node:assert";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { validate } from "../validate.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import {
	isBigInt64Array,
	isBigUint64Array,
	isFloat32Array,
	isFloat64Array,
	isInt8Array,
	isInt16Array,
	isInt32Array,
	isUint8Array,
	isUint8ClampedArray,
	isUint16Array,
	isUint32Array,
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

test("typed array checkers preserve names and serialization", () => {
	assert.equal(isUint8Array.name, "isUint8Array");
	assert.equal(isUint8Array.toString(), "TypeChecker<isUint8Array>");
});

test("typed array checkers reject DataView and spoofed objects", () => {
	let propertyAccessCount = 0;
	const spoof = {
		get BYTES_PER_ELEMENT() {
			propertyAccessCount += 1;
			return 1;
		},
		[Symbol.toStringTag]: "Uint8Array",
	};

	assert.equal(isUint8Array(new DataView(new ArrayBuffer(1))), false);
	assert.equal(isUint8Array(spoof), false);
	assert.equal(propertyAccessCount, 0);
});

test("typed array checkers accept cross-realm views", () => {
	const crossRealmUint8Array = runInNewContext("new Uint8Array([1])");
	assert.equal(isUint8Array(crossRealmUint8Array), true);
});

test("typed array diagnostics distinguish the base and element type", () => {
	assert.deepEqual(validate({}, isUint8Array), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.GuardFailed,
			expected: "TypeChecker<isTypedArray>",
			actualType: "Object",
		},
	});
	assert.deepEqual(validate(new Uint16Array(1), isUint8Array), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.NarrowingFailed,
			expected: "a Uint8Array",
		},
	});
});

import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isObject } from "./Object.ts";

for (const { name, input, expected } of checkerTestCase(
	"EmptyArray",
	"Object",
	"InvalidDate",
	"ValidDate",
	"Function",
	"Class",
	"Uint8Array",
	"Uint8ClampedArray",
	"Uint16Array",
	"Uint32Array",
	"Int8Array",
	"Int16Array",
	"Int32Array",
	"Float32Array",
	"Float64Array",
	"BigUint64Array",
	"BigInt64Array",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isObject(input), expected);
	});
}

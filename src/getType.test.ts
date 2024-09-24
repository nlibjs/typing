import { test } from "node:test";
import * as assert from "node:assert";
import { getType } from "./getType.ts";

const tests: Array<[unknown, string]> = [
	[null, "Null"],
	[undefined, "Undefined"],
	[true, "Boolean"],
	[false, "Boolean"],
	[0, "Number"],
	[Number.NaN, "Number"],
	[Number.POSITIVE_INFINITY, "Number"],
	["0", "String"],
	[{}, "Object"],
	[[], "Array"],
	[/.*/, "RegExp"],
	[new Date(), "Date"],
	[new Error(), "Error"],
	[new Uint32Array(1), "Uint32Array"],
	[new (class MyClass {})(), "MyClass"],
];
for (const [value, expected] of tests) {
	test(`${value} → ${expected}`, () => {
		assert.equal(getType(value), expected);
	});
}

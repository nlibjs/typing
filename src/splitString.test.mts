import { test } from "node:test";
import * as assert from "node:assert";
import { splitString } from "./splitString.mjs";

test("csv", () => {
	const input = "a, b c , d,";
	const generator = splitString(input, ",");
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 0, end: 1, next: 2, value: "a" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 2, end: 7, next: 8, value: " b c " },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 8, end: 10, next: 11, value: " d" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 11, end: 11, next: 12, value: "" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: true,
		value: undefined,
	});
});

test("separate by ==", () => {
	const input = "a== b c == d====";
	const generator = splitString(input, "==");
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 0, end: 1, next: 3, value: "a" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 3, end: 8, next: 10, value: " b c " },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 10, end: 12, next: 14, value: " d" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 14, end: 14, next: 16, value: "" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: false,
		value: { start: 16, end: 16, next: 18, value: "" },
	});
	assert.deepStrictEqual(generator.next(), {
		done: true,
		value: undefined,
	});
});

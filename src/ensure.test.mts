import { test } from "node:test";
import * as assert from "node:assert";
import { ensure } from "./ensure.mjs";
import { isString } from "./is/String.mjs";

test("throw an error if 3rd is undefined", () => {
	const regexp = /^Error: TypeCheckError/;
	assert.throws(() => ensure(1, isString), regexp);
	assert.throws(() => ensure(1, isString, undefined), regexp);
});

test("return the fallback value if 3rd is given", () => {
	assert.equal(ensure(1, isString, 2), 2);
	assert.equal(ensure("1", isString, 2), "1");
});

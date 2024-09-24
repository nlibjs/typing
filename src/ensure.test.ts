import { test } from "node:test";
import * as assert from "node:assert";
import { ensure } from "./ensure.ts";
import { isString } from "./is/String.ts";

test("throw an error", () => {
	const regexp = /^Error: TypeCheckError/;
	assert.throws(() => ensure(1, isString), regexp);
});

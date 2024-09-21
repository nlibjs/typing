import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isUndefined } from "./Undefined.ts";

for (const { key, input, expected } of listCheckerTests("Undefined")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isUndefined(input), expected);
	});
}

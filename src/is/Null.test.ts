import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isNull } from "./Null.ts";

for (const { key, input, expected } of listCheckerTests("Null")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isNull(input), expected);
	});
}

import { test } from "node:test";
import * as assert from "node:assert";
import { testValue } from "./testValue.ts";

test("return false if the definition is null", () => {
	assert.equal(testValue(1, null as never), false);
});

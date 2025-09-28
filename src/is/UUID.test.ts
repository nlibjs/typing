import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isUUID } from "./UUID.ts";

for (const { name, input, expected } of checkerTestCase(
	"UUIDLowercase",
	"UUIDUppercase",
	"UUIDMixedcase",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isUUID(input), expected);
	});
}

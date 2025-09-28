import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isHttpsUrlString } from "./HttpsUrlString.ts";

for (const { name, input, expected } of checkerTestCase(
	"HttpsUrl",
	"HttpsUrlWithPort",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isHttpsUrlString(input), expected);
	});
}

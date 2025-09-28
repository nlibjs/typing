import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isHttpResponseStatusCode } from "./HttpResponseStatusCode.ts";

for (const { name, input, expected } of checkerTestCase(
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isHttpResponseStatusCode(input), expected);
	});
}

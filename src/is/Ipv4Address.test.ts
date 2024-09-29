import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isIpv4Address } from "./Ipv4Address.ts";

for (const { name, input, expected } of checkerTestCase("IPv4")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isIpv4Address(input), expected);
	});
}

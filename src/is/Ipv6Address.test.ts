import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isIpv6Address } from "./Ipv6Address.ts";

for (const { name, input, expected } of checkerTestCase("IPv6")) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isIpv6Address(input), expected);
	});
}

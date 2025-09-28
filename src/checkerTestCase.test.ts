import * as fs from "node:fs";
import * as vm from "node:vm";
import ts from "typescript";
import { checkerTestValues } from "./checkerTestValues.test.ts";

const checkerTestValuesFromAnotherContext: typeof checkerTestValues = (() => {
	const tsCode = fs.readFileSync(
		new URL("./checkerTestValues.test.ts", import.meta.url),
		"utf-8",
	);
	const result = ts.transpileModule(tsCode, {});
	const context = { exports: {} };
	vm.runInNewContext(result.outputText, context);
	return (context.exports as { checkerTestValues: typeof checkerTestValues })
		.checkerTestValues;
})();

type CaseName = keyof typeof checkerTestValues;
export const checkerTestCase = function* (...trueCases: Array<CaseName>) {
	for (const name of Object.keys(checkerTestValues) as Array<CaseName>) {
		const input = checkerTestValues[name];
		const expected = trueCases.includes(name);
		yield { name, input, expected };
		const foreignInput = checkerTestValuesFromAnotherContext[name];
		yield { name: `${name} (another context)`, input: foreignInput, expected };
	}
};

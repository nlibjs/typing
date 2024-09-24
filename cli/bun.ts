import ts from "typescript";
import { URL } from "node:url";
import { listFiles, listTsSourceStringLiterals } from "./util.ts";
import * as fs from "node:fs/promises";

const srcDir = new URL("../src/", import.meta.url);
const bunDir = new URL("../bun/", import.meta.url);

await fs.mkdir(bunDir, { recursive: true });

for await (const fileUrl of listFiles(bunDir)) {
	await fs.unlink(fileUrl);
}

for await (const fileUrl of listFiles(srcDir)) {
	const filePath = fileUrl.pathname.slice(srcDir.pathname.length);
	if (filePath.endsWith(".ts")) {
		let code = await fs.readFile(fileUrl, "utf-8");
		const tsSource = ts.createSourceFile(
			filePath,
			code,
			ts.ScriptTarget.ESNext,
		);
		const replaceList: Array<ts.StringLiteral> = [];
		for (const node of listTsSourceStringLiterals(tsSource)) {
			const importFromText = node.text;
			if (importFromText === "node:test") {
				replaceList.push(node);
			}
		}
		replaceList.sort((n1, n2) => n2.getFullStart() - n1.getFullStart());
		for (const node of replaceList) {
			const start = code.indexOf(node.text, node.getFullStart());
			const end = start + node.text.length;
			code = `${code.slice(0, start)}bun:test${code.slice(end)}`;
		}
		const destUrl = new URL(filePath, bunDir);
		await fs.mkdir(new URL(".", destUrl), { recursive: true });
		await fs.writeFile(destUrl, code);
	}
}

import * as fs from "node:fs/promises";
import { URL } from "node:url";
import ts from "typescript";
import { listFiles, listTsSourceStringLiterals } from "./util.ts";

const srcDir = new URL("../src/", import.meta.url);
const tempDir = new URL("../temp/", import.meta.url);
const exclude = [/\.test\..*$/];

await fs.mkdir(tempDir, { recursive: true });

for await (const fileUrl of listFiles(tempDir)) {
	await fs.unlink(fileUrl);
}

for await (const fileUrl of listFiles(srcDir, exclude)) {
	const filePath = fileUrl.pathname.slice(srcDir.pathname.length);
	if (filePath.endsWith(".ts")) {
		let code = await fs.readFile(fileUrl, "utf-8");
		const tsSource = ts.createSourceFile(
			filePath,
			code,
			ts.ScriptTarget.ESNext,
		);
		const replaceList: Array<ts.StringLiteral> = [];
		const ext = ".ts";
		for (const node of listTsSourceStringLiterals(tsSource)) {
			const importFromText = node.text;
			if (importFromText.startsWith(".") && importFromText.endsWith(ext)) {
				replaceList.push(node);
			}
		}
		replaceList.sort((n1, n2) => n2.getFullStart() - n1.getFullStart());
		for (const node of replaceList) {
			const start = code.indexOf(node.text, node.getFullStart());
			const end = start + node.text.length;
			code = `${code.slice(0, end - ext.length)}.js${code.slice(end)}`;
		}
		const destUrl = new URL(filePath, tempDir);
		await fs.mkdir(new URL(".", destUrl), { recursive: true });
		await fs.writeFile(destUrl, code);
	}
}

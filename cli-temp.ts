import * as ts from "typescript";
import { URL } from "node:url";
import { listFiles } from "./cli-util.ts";
import * as fs from "node:fs/promises";

const srcDir = new URL("src/", import.meta.url);
const tempDir = new URL("temp/", import.meta.url);
const exclude = [/\.test\..*$/];

const walkTsSource = function* (
	node: ts.Node,
	tsSource: ts.SourceFile,
	depth = 0,
): Generator<[ts.Node, number]> {
	yield [node, depth];
	for (const child of node.getChildren(tsSource)) {
		yield* walkTsSource(child, tsSource, depth + 1);
	}
};

const listTsSourceStringLiterals = function* (
	tsSource: ts.SourceFile,
): Generator<ts.StringLiteral> {
	for (const [node] of walkTsSource(tsSource, tsSource)) {
		if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
			let checking = false;
			for (const [n] of walkTsSource(node, tsSource)) {
				if (checking) {
					if (ts.isStringLiteral(n)) {
						yield n;
						break;
					}
				} else if (n.kind === ts.SyntaxKind.FromKeyword) {
					checking = true;
				}
			}
		} else if (ts.isImportTypeNode(node)) {
			let checking = false;
			for (const [n] of walkTsSource(node, tsSource)) {
				if (checking) {
					if (ts.isStringLiteral(n)) {
						yield n;
						break;
					}
				} else if (n.kind === ts.SyntaxKind.OpenParenToken) {
					checking = true;
				}
			}
		}
	}
};

await fs.mkdir(tempDir, { recursive: true });
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

import * as fs from "node:fs/promises";
import { URL } from "node:url";

export const listFiles = async function* (
	fileUrl: URL,
	excludeList: Array<RegExp> = [],
): AsyncGenerator<URL> {
	const stats = await fs.stat(fileUrl);
	if (stats.isFile()) {
		for (const regexp of excludeList) {
			if (regexp.test(fileUrl.pathname)) {
				return;
			}
		}
		yield fileUrl;
	} else if (stats.isDirectory()) {
		fileUrl.pathname = fileUrl.pathname.replace(/\/*$/, "/");
		for (const name of await fs.readdir(fileUrl)) {
			yield* listFiles(new URL(name, fileUrl), excludeList);
		}
	}
};

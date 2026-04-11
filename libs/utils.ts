import { readFile, writeFile } from "fs";

export interface CopyableOption {
	name: string;
	actions: Record<string, string>[];
}

export function defineCopyable<T extends CopyableOption>(obj: T): T {
	return Object.assign({}, obj);
}

export function jsonModify(path: string, needed: any) {
	readFile(path, "utf-8", (err, data) => {
		if (err) throw err;
		const json = JSON.parse(data);
		for (const key in needed) {
			if (json[key]) {
				json[key] = needed[key];
			}
		}
		writeFile(path, JSON.stringify(json, null, 2), (err) => {
			if (err) throw err;
		});
	});
}

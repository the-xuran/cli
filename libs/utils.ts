export interface CopyableOption {
	name: string;
	actions: Record<string, string>[];
}

export function defineCopyable<T extends CopyableOption>(obj: T): T {
	return Object.assign({}, obj);
}

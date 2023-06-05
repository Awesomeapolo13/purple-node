export interface StorageServiceInterface {
	isExists: (path: string) => Promise<boolean>;
	getKeyValue: <T = any>(key: string) => Promise<T>;
	saveKeyValue: (key: string, value: any) => Promise<void>;
	addKeyValue: (key: string, value: any) => Promise<void>;
	removeKeyValue: (key: string, value: any) => Promise<void>;
}

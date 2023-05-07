export interface StorageServiceInterface {
    isExists: (path: string) => Promise<boolean>;
    getKeyValue: (key: string) => Promise<any>;
    saveKeyValue: (key: string, value: any) => Promise<void>;
    addKeyValue: (key: string, value: any) => Promise<void>;
    removeKeyValue: (key: string, value: any) => Promise<void>;
}

import { StorageServiceInterface } from './storage.service.interface';
import { promises } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { injectable } from 'inversify';

@injectable()
export class StorageService implements StorageServiceInterface {
	private static readonly FILE_PATH = join(homedir(), 'weather-data.json');
	public async isExists(path: string): Promise<boolean> {
		try {
			await promises.stat(path);

			return true;
		} catch (e) {
			return false;
		}
	}

	public async getKeyValue<T = any>(key: string): Promise<T> {
		const data = await this.getData(StorageService.FILE_PATH);

		return data[key];
	}

	public async saveKeyValue(key: string, value: any): Promise<void> {
		const filePath = StorageService.FILE_PATH;
		const data = (await this.getData(filePath)) ?? {};
		data[key] = value;
		await promises.writeFile(filePath, JSON.stringify(data));
	}

	public async addKeyValue(key: string, value: any): Promise<void> {
		const filePath = StorageService.FILE_PATH;
		const data = await this.getDataWithListKeyProvided(filePath, key);

		if (!data[key].includes(value)) {
			data[key].push(value);
			await promises.writeFile(filePath, JSON.stringify(data));
		}
	}

	public async removeKeyValue(key: string, value: any): Promise<void> {
		const filePath = StorageService.FILE_PATH;
		const data = await this.getDataWithListKeyProvided(filePath, key);

		const valueId = data[key].indexOf(value);
		if (valueId > -1) {
			data[key].splice(valueId, 1);
		}

		await promises.writeFile(filePath, JSON.stringify(data));
	}

	private async checkSettingsExists(): Promise<void> {
		if (!(await this.isExists(StorageService.FILE_PATH))) {
			throw new Error('Customer settings file is not exists');
		}
	}

	private async getData<T = any>(filepath: string): Promise<T> {
		await this.checkSettingsExists();
		const file = await promises.readFile(filepath);

		return JSON.parse(file.toString());
	}
	private async getDataWithListKeyProvided<T = any>(filepath: string, key: string): Promise<T> {
		const data = await this.getData(filepath);

		return this.provideListProp(data, key);
	}

	private async provideListProp<T = any>(data: any, key: string): Promise<T> {
		if (!data[key]) {
			data[key] = [];
		}

		return data;
	}
}

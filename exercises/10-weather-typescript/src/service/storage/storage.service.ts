import { StorageServiceInterface } from './storage.service.interface';
import { promises } from 'fs';
import { AllowedTokenEnum } from './allowed.token.enum';
import { join } from 'path';
import { homedir } from 'os';
import { LogLanguageDictionary } from '../../dictionary/language/log.language.dictionary';
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

	public async getKeyValue(key: string): Promise<any> {
		if (await this.isExists(StorageService.FILE_PATH)) {
			const file = await promises.readFile(StorageService.FILE_PATH);
			const data = JSON.parse(file.toString());

			// Если запрашивается язык, но нет сохраненных настроек, то возвращаем ru по умолчанию.
			return key === AllowedTokenEnum.LANGUAGE && !data[key]
				? LogLanguageDictionary.AVAILABLE_LANGS.RU
				: data[key];
		}

		return undefined;
	}

	saveKeyValue(key: string, value: any): Promise<void> {
		return Promise.resolve(undefined);
	}

	addKeyValue(key: string, value: any): Promise<void> {
		return Promise.resolve(undefined);
	}

	removeKeyValue(key: string, value: any): Promise<void> {
		return Promise.resolve(undefined);
	}
}

import { HelpHandlerInterface } from '../help/help.handler.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { LanguageType } from './dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from './dictionary/language/log.language.dictionary';
import { LanguageHandlerInterface } from './language.handler.interface';
import { LanguageDto } from './language.dto';

@injectable()
export class LanguageHandler implements LanguageHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {}

	async handleLangSet({ lang }: LanguageDto): Promise<string> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		let message = LogLanguageDictionary[langKey].isNotAvailableLang;
		if (
			lang === LogLanguageDictionary.AVAILABLE_LANGS.EN ||
			lang === LogLanguageDictionary.AVAILABLE_LANGS.RU
		) {
			await this.storageService.saveKeyValue(AllowedTokenEnum.LANGUAGE, lang);
			message = LogLanguageDictionary[langKey].saveLangSuccess;
		}

		return message;
	}
}

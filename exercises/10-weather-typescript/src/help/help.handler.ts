import { HelpHandlerInterface } from './help.handler.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { LanguageType } from '../language/dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';

@injectable()
export class HelpHandler implements HelpHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {}

	async handleHelp(): Promise<string | null> {
		const langKey: LanguageType = await this.storageService.getKeyValue<LanguageType>(
			AllowedTokenEnum.LANGUAGE,
		);

		return LogLanguageDictionary[langKey].help ?? null;
	}
}

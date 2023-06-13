import { UserHandlerInterface } from './user.handler.interface';
import { UserLoginDto } from './user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { LanguageType } from '../language/dictionary/language/language.type';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';

@injectable()
export class UserHandler implements UserHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
	) {}
	async handleLogin({ token }: UserLoginDto): Promise<string> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		await this.storageService.saveKeyValue(AllowedTokenEnum.TOKEN, token);

		return LogLanguageDictionary[langKey].saveTokenSuccess;
	}
}

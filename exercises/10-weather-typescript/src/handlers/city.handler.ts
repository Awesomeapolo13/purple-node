import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { LanguageType } from '../dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from '../dictionary/language/log.language.dictionary';
import { CityHandlerInterface } from './city.handler.interface';
import { CityDto } from './dto/city.dto';

@injectable()
export class CityHandler implements CityHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {}

	public async handleCityAdd({ city }: CityDto): Promise<string> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const cityList = await this.storageService.getKeyValue(AllowedTokenEnum.CITY);
		let message = LogLanguageDictionary[langKey].cityIsExists;

		if (!cityList.includes(city)) {
			await this.storageService.addKeyValue(AllowedTokenEnum.CITY, city);
			message = LogLanguageDictionary[langKey].saveCitySuccess;
		}

		return message;
	}

	public async handleCityRemove({ city }: CityDto): Promise<string> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const cityList: string[] = await this.storageService.getKeyValue<string[]>(
			AllowedTokenEnum.CITY,
		);
		let message = LogLanguageDictionary[langKey].cityIsNotExists;

		if (cityList.includes(city)) {
			await this.storageService.removeKeyValue(AllowedTokenEnum.CITY, city);
			message = LogLanguageDictionary[langKey].removeCitySuccess;
		}

		return message;
	}
}

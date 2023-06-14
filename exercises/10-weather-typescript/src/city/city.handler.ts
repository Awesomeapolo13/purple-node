import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { LanguageType } from '../language/dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';
import { CityHandlerInterface } from './city.handler.interface';
import { CityDto } from './city.dto';
import { HttpError } from '../common/error/http.error';
import { HttpCodeEnum } from '../common/error/http.code.enum';

@injectable()
export class CityHandler implements CityHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {}

	public async handleCityAdd({ city }: CityDto): Promise<string> {
		const [langKey, cityList] = await this.getLangAndCities();
		if (Array.isArray(cityList) && cityList.includes(city)) {
			throw new HttpError(
				HttpCodeEnum.BAD_REQUEST_CODE,
				LogLanguageDictionary[langKey].cityIsExists,
			);
		}
		await this.storageService.addKeyValue(AllowedTokenEnum.CITY, city);

		return LogLanguageDictionary[langKey].saveCitySuccess;
	}

	public async handleCityRemove({ city }: CityDto): Promise<string> {
		const [langKey, cityList] = await this.getLangAndCities();
		if (Array.isArray(cityList) && !cityList.includes(city)) {
			throw new HttpError(
				HttpCodeEnum.BAD_REQUEST_CODE,
				LogLanguageDictionary[langKey].cityIsNotExists,
			);
		}
		await this.storageService.removeKeyValue(AllowedTokenEnum.CITY, city);

		return LogLanguageDictionary[langKey].removeCitySuccess;
	}

	private async getLangAndCities(): Promise<[LanguageType, string[] | undefined]> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const cityList: string[] | undefined = await this.storageService.getKeyValue<
			string[] | undefined
		>(AllowedTokenEnum.CITY);

		return [langKey, cityList];
	}
}

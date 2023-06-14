import { ApiServiceInterface } from './api.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { StorageServiceInterface } from '../storage/storage.service.interface';
import { AllowedTokenEnum } from '../storage/allowed.token.enum';
import { LanguageType } from '../../language/dictionary/language/language.type';
import axios from 'axios';
import { ApiWeatherRespType } from './api.weather.resp.type';
import { LoggerInterface } from '../../logger/logger.interface';
import { HttpError } from '../../common/error/http.error';
import { HttpCodeEnum } from '../../common/error/http.code.enum';
import { LogLanguageDictionary } from '../../language/dictionary/language/log.language.dictionary';

@injectable()
export class ApiService implements ApiServiceInterface {
	readonly ICONS: Record<string, string> = {
		'01': '☀️',
		'02': '🌤️',
		'03': '☁️',
		'04': '☁️',
		'09': '🌧️',
		'10': '🌦️',
		'11': '🌩️',
		'13': '❄️',
		'50': '🌫️',
	};

	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.LoggerInterface) private readonly logger: LoggerInterface,
	) {}

	public getIcon(iconNumber: string): string {
		return this.ICONS[iconNumber.slice(0, -1)] || '';
	}

	public async getWeather(city: string): Promise<ApiWeatherRespType> {
		const apiToken: string = await this.storageService.getKeyValue<string>(AllowedTokenEnum.TOKEN);
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);

		if (!apiToken) {
			throw new HttpError(
				HttpCodeEnum.BAD_REQUEST_CODE,
				LogLanguageDictionary[langKey].tokenIsEmptyMsg,
			);
		}

		this.logger.log('Weather request', {
			q: city,
			appid: apiToken,
			lang: langKey,
			units: 'metric',
		});

		const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: apiToken,
				lang: langKey,
				units: 'metric',
			},
		});

		this.logger.log('Weather response', data);

		return data;
	}
}

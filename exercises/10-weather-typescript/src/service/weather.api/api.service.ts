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
import { ConfigServiceInterface } from '../../config/config.service.interface';

@injectable()
export class ApiService implements ApiServiceInterface {
	private static readonly OPEN_WEATHER_URL_KEY: string = 'OPEN_WEATHER_API_URL';
	private static readonly WEATHER_UNITS_KEY: string = 'WEATHER_UNITS';
	private static readonly WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
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
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
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
			units: this.configService.get('WEATHER_UNITS_KEY'),
		});

		const { data } = await axios.get(
			this.configService.get(ApiService.OPEN_WEATHER_URL_KEY) ?? ApiService.WEATHER_API_URL,
			{
				params: {
					q: city,
					appid: apiToken,
					lang: langKey,
					units: this.configService.get('WEATHER_UNITS_KEY'),
				},
			},
		);

		this.logger.log('Weather response', data);

		return data;
	}
}

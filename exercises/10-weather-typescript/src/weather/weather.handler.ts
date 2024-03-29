import { WeatherHandlerInterface } from './weather.handler.interface';
import { WeatherDto } from './weather.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { ApiServiceInterface } from '../service/weather.api/api.service.interface';
import { LanguageType } from '../language/dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { ApiWeatherRespType } from '../service/weather.api/api.weather.resp.type';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';

@injectable()
export class WeatherHandler implements WeatherHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ApiService) private readonly apiService: ApiServiceInterface,
	) {}

	public async handleWeatherAll(): Promise<string[]> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const cities = await this.storageService.getKeyValue<string[]>(AllowedTokenEnum.CITY);
		const weatherList: string[] = [];

		for (const city of cities) {
			// сделать через map
			const weather = await this.apiService.getWeather(city);
			const icon = this.getWeatherStructure(weather);
			weatherList.push(
				LogLanguageDictionary[langKey].weather(
					weather.name,
					weather.weather[0].description,
					weather.main.temp,
					weather.main.feels_like,
					weather.main.humidity,
					weather.wind.speed,
					icon,
				),
			);
		}

		return weatherList;
	}

	public async handleWeatherByCity({ city }: WeatherDto): Promise<string> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const result = await this.apiService.getWeather(city);
		const icon = this.getWeatherStructure(result);

		return LogLanguageDictionary[langKey].weather(
			result.name,
			result.weather[0].description,
			result.main.temp,
			result.main.feels_like,
			result.main.humidity,
			result.wind.speed,
			icon,
		);
	}

	/**
	 * Получает иконку из ответа апи.
	 */
	private getWeatherStructure(weather: ApiWeatherRespType): string {
		return this.apiService.getIcon(weather.weather[0].icon);
	}
}

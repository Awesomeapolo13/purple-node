import {WeatherHandlerInterface} from "./weather.handler.interface";
import {WeatherDto} from "./dto/weather.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";
import {ApiServiceInterface} from "../service/api/api.service.interface";
import {LanguageType} from "../dictionary/language/language.type";
import {AllowedTokenEnum} from "../service/storage/allowed.token.enum";
import {ApiWeatherRespType} from "../service/api/api.weather.resp.type";
import {LogLanguageDictionary} from "../dictionary/language/log.language.dictionary";

@injectable()
export class WeatherHandler implements WeatherHandlerInterface{
    constructor(
        @inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
        @inject(TYPES.ApiService) private readonly apiService: ApiServiceInterface
    ) {
    }

    public async handleWeatherAll(): Promise<string[]> {
        const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
        const cities = await this.storageService.getKeyValue(AllowedTokenEnum.CITY);
        let weatherList: string[] = [];

        for (const city of cities) {
            let weather = await this.apiService.getWeather(city);
            let icon = this.getWeatherStructure(weather, langKey);
            weatherList.push(LogLanguageDictionary[langKey].weather(weather, icon));
        }

        return weatherList;
    }

    public async handleWeatherByCity({ city }: WeatherDto): Promise<string> {
        const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
        const result = await this.apiService.getWeather(city);
        const icon = this.getWeatherStructure(result, langKey);

        return LogLanguageDictionary[langKey].weather(result, icon);
    }

    /**
     * Получает иконку из ответа апи.
     */
    private getWeatherStructure(weather: ApiWeatherRespType, lang: string): string {
        return this.apiService.getIcon(weather.weather[0].icon);
    }
}

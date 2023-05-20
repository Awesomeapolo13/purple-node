import {WeatherHandlerInterface} from "./weather.handler.interface";
import {WeatherDto} from "./dto/weather.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";
import {ApiServiceInterface} from "../service/api/api.service.interface";
import {LanguageType} from "../dictionary/language/language.type";
import {AllowedTokenEnum} from "../service/storage/allowed.token.enum";

@injectable()
export class WeatherHandler implements WeatherHandlerInterface{
    constructor(
        @inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
        @inject(TYPES.ApiService) private readonly apiService: ApiServiceInterface
    ) {
    }

    public async handleWeatherAll(): Promise<string> {
        // ToDo: Вызвать сервис АПИ
        return "";
    }

    public async handleWeatherByCity({ city }: WeatherDto): Promise<string> {
        const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
        const result = await this.apiService.getWeather(city);

        // ToDo: Вызвать сервис АПИ
        return "";
    }

    private getWeatherStructure(weather: object, lang: string) {
        // const icon = this.apiService.getIcon(weather.weather[0].icon);
    }
}

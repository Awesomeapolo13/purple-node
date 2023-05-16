import {ApiServiceInterface} from "./api.service.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../types";
import {StorageServiceInterface} from "../storage/storage.service.interface";
import {AllowedTokenEnum} from "../storage/allowed.token.enum";
import {LanguageType} from "../../dictionary/language/language.type";
import axios from 'axios';

@injectable()
export class ApiService implements ApiServiceInterface{
    readonly ICONS: {
        [key: string]: string,
    } = {
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
        @inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface
    ) {
    }

    public getIcon(icon: string): string {
        return this.ICONS[icon.slice(0, -1)] !== undefined
            ? this.ICONS[icon.slice(0, -1)]
            : '';
    }

    public async getWeather(city: string): Promise<object> {
        const apiToken: string | undefined = await this.storageService.getKeyValue(AllowedTokenEnum.TOKEN);
        const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);

        if (!apiToken) {
            // ToDo: Придумать нормальную ошибку и залогировать.
            throw new Error('No token');
        }

        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: apiToken,
                lang: langKey,
                units: 'metric',
            }
        });

        return data;
    };
}

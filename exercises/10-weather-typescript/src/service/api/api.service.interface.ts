import {ApiWeatherRespType} from "./api.weather.resp.type";

export interface ApiServiceInterface {
    readonly ICONS: object;

    getIcon: (icon: string) => string;
    getWeather: (city: string) => Promise<ApiWeatherRespType>;
}

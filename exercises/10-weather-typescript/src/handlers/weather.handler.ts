import {WeatherHandlerInterface} from "./weather.handler.interface";
import {WeatherDto} from "./dto/weather.dto";
import {injectable} from "inversify";

@injectable()
export class WeatherHandler implements WeatherHandlerInterface{
    async handleWeatherAll(): Promise<string> {
        // ToDo: Вызвать сервис АПИ
        return "";
    }

    async handleWeatherByCity(weatherDto: WeatherDto): Promise<string> {
        // ToDo: Вызвать сервис АПИ
        return "";
    }
}

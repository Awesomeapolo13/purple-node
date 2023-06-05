import { WeatherDto } from './weather.dto';

export interface WeatherHandlerInterface {
	handleWeatherByCity: (weatherDto: WeatherDto) => Promise<string>;
	handleWeatherAll: () => Promise<string[]>;
}

import { NextFunction, Request, Response } from 'express';
import { WeatherDto } from './weather.dto';

export interface WeatherControllerInterface {
	getWeatherForCity: (
		{ query, body }: Request<{}, {}, {}, WeatherDto>,
		res: Response,
		next: NextFunction,
	) => void;
	getWeatherAll: (req: Request, res: Response, next: NextFunction) => void;
}

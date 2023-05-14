import {NextFunction, Request, Response} from "express";

export interface WeatherControllerInterface {
    getWeatherForCity: (req: Request, res: Response, next: NextFunction) => void;
    getWeatherAll: (req: Request, res: Response, next: NextFunction) => void;
}

import {BaseController} from "../common/base.controller";
import {WeatherControllerInterface} from "./weather.controller.interface";
import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {LoggerInterface} from "../logger/logger.interface";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";
import {WeatherHandlerInterface} from "../handlers/weather.handler.interface";
import {ValidateMiddleware} from "../common/validate.middleware";
import {WeatherDto} from "../handlers/dto/weather.dto";

@injectable()
export class WeatherController extends BaseController implements WeatherControllerInterface {
    constructor(
        @inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
        @inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
        @inject(TYPES.WeatherHandler) private readonly weatherHandler: WeatherHandlerInterface
    ) {
        super(logger);
        this.bindRoutes([
            {
                path: '/weather',
                method: 'get',
                func: this.getWeatherAll,
            },
            {
                path: '/',
                method: 'get',
                func: this.getWeatherForCity,
                middlewares: [new ValidateMiddleware(WeatherDto)],
            },
        ]);
    }

    getWeatherAll(req: Request, res: Response, next: NextFunction): void {
    }

    public async getWeatherForCity(
        { query }: Request<{}, {}, {}, WeatherDto>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const result = await this.weatherHandler.handleWeatherByCity(query);

        this.ok(res, {success: true});
    }
}
import { BaseController } from '../common/base.controller';
import { WeatherControllerInterface } from './weather.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { WeatherHandlerInterface } from './weather.handler.interface';
import { ValidateMiddleware } from '../common/middleware/validate.middleware';
import { WeatherDto } from './weather.dto';
import { LanguageType } from '../language/dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';
import { HttpError } from '../common/error/http.error';
import { AuthMiddleware } from '../common/middleware/auth.middleware';

@injectable()
export class WeatherController extends BaseController implements WeatherControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.WeatherHandler) private readonly weatherHandler: WeatherHandlerInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/all',
				method: 'get',
				func: this.getWeatherAll,
				middlewares: [new AuthMiddleware(this.storageService)],
			},
			{
				path: '/',
				method: 'get',
				func: this.getWeatherForCity,
				middlewares: [new ValidateMiddleware(WeatherDto), new AuthMiddleware(this.storageService)],
			},
		]);
	}

	public async getWeatherAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		let result: string[] = [];

		try {
			result = await this.weatherHandler.handleWeatherAll();
		} catch (e) {
			return next(new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong));
		}

		this.ok(res, {
			success: true,
			weatherList: result,
		});
	}

	public async getWeatherForCity(
		{ query, body }: Request<{}, {}, {}, WeatherDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		let result: string = LogLanguageDictionary[langKey].smtWentWrong;

		try {
			result = await this.weatherHandler.handleWeatherByCity(query);
		} catch (e) {
			return next(new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong));
		}

		this.ok(res, {
			success: true,
			weather: result,
		});
	}
}

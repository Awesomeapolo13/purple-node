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
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { HttpCodeEnum } from '../common/error/http.code.enum';
import { LanguageMiddleware } from '../common/middleware/language.middleware';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { HttpError } from '../common/error/http.error';

@injectable()
export class WeatherController extends BaseController implements WeatherControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
		@inject(TYPES.WeatherHandler) private readonly weatherHandler: WeatherHandlerInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/all',
				method: 'get',
				func: this.getWeatherAll,
				middlewares: [
					new LanguageMiddleware(this.configService, this.storageService),
					new AuthMiddleware(this.storageService),
				],
			},
			{
				path: '/',
				method: 'get',
				func: this.getWeatherForCity,
				middlewares: [
					new LanguageMiddleware(this.configService, this.storageService),
					new ValidateMiddleware(WeatherDto, this.storageService),
					new AuthMiddleware(this.storageService),
				],
			},
		]);
	}

	public async getWeatherAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			this.ok(res, {
				success: true,
				weatherList: await this.weatherHandler.handleWeatherAll(),
			});
		} catch (e) {
			const langKey: LanguageType = await this.storageService.getKeyValue(
				AllowedTokenEnum.LANGUAGE,
			);
			if (e instanceof HttpError) {
				return this.error(next, e.message, e.statusCode);
			}
			return this.error(
				next,
				LogLanguageDictionary[langKey].smtWentWrong,
				HttpCodeEnum.BAD_REQUEST_CODE,
			);
		}
	}

	public async getWeatherForCity(
		{ query, body }: Request<{}, {}, {}, WeatherDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			this.ok(res, {
				success: true,
				weather: await this.weatherHandler.handleWeatherByCity(query),
			});
		} catch (e) {
			const langKey: LanguageType = await this.storageService.getKeyValue(
				AllowedTokenEnum.LANGUAGE,
			);
			if (e instanceof HttpError) {
				return this.error(next, e.message, e.statusCode);
			}
			return this.error(
				next,
				LogLanguageDictionary[langKey].smtWentWrong,
				HttpCodeEnum.BAD_REQUEST_CODE,
			);
		}
	}
}

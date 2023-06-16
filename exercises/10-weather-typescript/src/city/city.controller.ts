import { CityControllerInterface } from './city.controller.interface';
import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { CityDto } from './city.dto';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { CityHandlerInterface } from './city.handler.interface';
import { ValidateMiddleware } from '../common/middleware/validate.middleware';
import { LanguageType } from '../language/dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { HttpCodeEnum } from '../common/error/http.code.enum';
import { HttpError } from '../common/error/http.error';
import { LanguageMiddleware } from '../common/middleware/language.middleware';
import { ConfigServiceInterface } from '../config/config.service.interface';

@injectable()
export class CityController extends BaseController implements CityControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.CityHandler) private cityHandler: CityHandlerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/add',
				method: 'post',
				func: this.handleCityAdd,
				middlewares: [
					new LanguageMiddleware(this.configService, this.storageService),
					new ValidateMiddleware(CityDto, this.storageService),
					new AuthMiddleware(this.storageService),
				],
			},
			{
				path: '/remove',
				method: 'post',
				func: this.handleCityRemove,
				middlewares: [
					new LanguageMiddleware(this.configService, this.storageService),
					new ValidateMiddleware(CityDto, this.storageService),
					new AuthMiddleware(this.storageService),
				],
			},
		]);
	}
	public async handleCityAdd(
		{ body }: Request<{}, {}, CityDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			this.ok(res, {
				success: true,
				message: await this.cityHandler.handleCityAdd(body),
			});
		} catch (e) {
			const langKey: LanguageType = await this.storageService.getKeyValue(
				AllowedTokenEnum.LANGUAGE,
			);
			if (e instanceof HttpError) {
				return this.error(next, e.message, e.statusCode);
			}
			return await this.errorReturn(next, langKey);
		}
	}

	public async handleCityRemove(
		{ body }: Request<{}, {}, CityDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			this.ok(res, {
				success: true,
				message: await this.cityHandler.handleCityRemove(body),
			});
		} catch (e) {
			const langKey: LanguageType = await this.storageService.getKeyValue(
				AllowedTokenEnum.LANGUAGE,
			);
			if (e instanceof HttpError) {
				return this.error(next, e.message, e.statusCode);
			}
			return await this.errorReturn(next, langKey);
		}
	}

	private async errorReturn(next: NextFunction, lang: LanguageType): Promise<void> {
		return this.error(
			next,
			LogLanguageDictionary[lang].smtWentWrong,
			HttpCodeEnum.BAD_REQUEST_CODE,
		);
	}
}

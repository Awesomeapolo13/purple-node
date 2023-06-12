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
import { HttpError } from '../common/error/http.error';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';
import { AuthMiddleware } from '../common/middleware/auth.middleware';

@injectable()
export class CityController extends BaseController implements CityControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.CityHandler) private cityHandler: CityHandlerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/add',
				method: 'post',
				func: this.handleCityAdd,
				middlewares: [new ValidateMiddleware(CityDto), new AuthMiddleware(this.storageService)],
			},
			{
				path: '/remove',
				method: 'post',
				func: this.handleCityRemove,
				middlewares: [new ValidateMiddleware(CityDto), new AuthMiddleware(this.storageService)],
			},
		]);
	}
	public async handleCityAdd(
		{ body }: Request<{}, {}, CityDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		let message: string = LogLanguageDictionary[langKey].wrongCitySetUpMsg;
		try {
			message = await this.cityHandler.handleCityAdd(body);
		} catch (e) {
			return next(new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong));
		}

		this.ok(res, {
			success: true,
			message: message,
		});
	}

	public async handleCityRemove(
		{ body }: Request<{}, {}, CityDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		let message: string = LogLanguageDictionary[langKey].wrongCitySetUpMsg;
		try {
			message = await this.cityHandler.handleCityRemove(body);
		} catch (e) {
			return next(new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong));
		}

		this.ok(res, {
			success: true,
			message: message,
		});
	}
}

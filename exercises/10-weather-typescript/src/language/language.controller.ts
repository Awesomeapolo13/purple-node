import { BaseController } from '../common/base.controller';
import { LanguageControllerInterface } from './language.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { ValidateMiddleware } from '../common/middleware/validate.middleware';
import { LanguageDto } from './language.dto';
import { LanguageHandlerInterface } from './language.handler.interface';
import { LogLanguageDictionary } from './dictionary/language/log.language.dictionary';
import { HttpError } from '../common/error/http.error';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { LanguageMiddleware } from '../common/middleware/language.middleware';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { LanguageType } from './dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';

@injectable()
export class LanguageController extends BaseController implements LanguageControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
		@inject(TYPES.LanguageHandler) private readonly languageHandler: LanguageHandlerInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/set',
				method: 'post',
				func: this.langSet,
				middlewares: [
					new ValidateMiddleware(LanguageDto),
					new AuthMiddleware(this.storageService),
					new LanguageMiddleware(this.configService, this.storageService),
				],
			},
		]);
	}
	public async langSet(
		{ headers, body }: Request<{}, {}, LanguageDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		let message: string = LogLanguageDictionary[langKey].langIsEmptyMsg;
		try {
			message = await this.languageHandler.handleLangSet(body);
		} catch (e) {
			return next(new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong));
		}

		this.ok(res, {
			success: true,
			message: message,
		});
	}
}

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
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { LanguageMiddleware } from '../common/middleware/language.middleware';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { LanguageType } from './dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { HttpCodeEnum } from '../common/error/http.code.enum';

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
					new LanguageMiddleware(this.configService, this.storageService),
					new ValidateMiddleware(LanguageDto, storageService),
					new AuthMiddleware(this.storageService),
				],
			},
		]);
	}
	public async langSet(
		{ body }: Request<{}, {}, LanguageDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			this.ok(res, {
				success: true,
				message: await this.languageHandler.handleLangSet(body),
			});
		} catch (e) {
			const langKey: LanguageType = await this.storageService.getKeyValue(
				AllowedTokenEnum.LANGUAGE,
			);
			return this.error(
				next,
				LogLanguageDictionary[langKey].smtWentWrong,
				HttpCodeEnum.BAD_REQUEST_CODE,
			);
		}
	}
}

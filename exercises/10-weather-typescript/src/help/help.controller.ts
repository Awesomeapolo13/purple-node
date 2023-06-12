import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { HelpHandlerInterface } from './help.handler.interface';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { BaseController } from '../common/base.controller';
import { LanguageType } from '../language/dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { HttpError } from '../common/error/http.error';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';
import { HelpControllerInterface } from './help.controller.interface';
import { LanguageMiddleware } from '../common/middleware/language.middleware';
import { ConfigServiceInterface } from '../config/config.service.interface';

@injectable()
export class HelpController extends BaseController implements HelpControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
		@inject(TYPES.HelpHandler) protected helpHandler: HelpHandlerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				func: this.help,
				middlewares: [new LanguageMiddleware(this.configService, this.storageService)],
			},
		]);
	}

	public async help(req: Request, res: Response, next: NextFunction): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const result = await this.helpHandler.handleHelp();

		if (!result) {
			throw new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong);
		}

		this.ok(res, {
			success: true,
			message: result,
		});
	}
}

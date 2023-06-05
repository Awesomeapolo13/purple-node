import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { HelpHandlerInterface } from '../handlers/help.handler.interface';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { BaseController } from '../common/base.controller';
import { LanguageType } from '../dictionary/language/language.type';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { HttpError } from '../service/error/http.error';
import { LogLanguageDictionary } from '../dictionary/language/log.language.dictionary';
import { HelpControllerInterface } from './help.controller.interface';

@injectable()
export class HelpController extends BaseController implements HelpControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.HelpHandler) protected helpHandler: HelpHandlerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				func: this.help,
			},
		]);
	}

	public async help(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.helpHandler.handleHelp();
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		if (!result) {
			throw new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong);
		}

		this.ok(res, {
			success: true,
			message: result,
		});
	}
}

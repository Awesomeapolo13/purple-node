import { MiddlewareInterface } from './middleware.interface';
import { Request, NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { LogLanguageDictionary } from '../dictionary/language/log.language.dictionary';
import { LanguageType } from '../dictionary/language/language.type';

export class AuthMiddleware implements MiddlewareInterface {
	private NO_AUTH_ROUTES: string[] = ['/user/login', '/help'];
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const token = req.headers.token;
		console.log(token);
		const isNoAuthRoute = this.NO_AUTH_ROUTES.includes(req.path);
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		isNoAuthRoute || token === (await this.storageService.getKeyValue(AllowedTokenEnum.TOKEN))
			? next()
			: res.status(401).send({
					success: false,
					message: LogLanguageDictionary[langKey].tokenErrorMsg,
			  });
	}
}

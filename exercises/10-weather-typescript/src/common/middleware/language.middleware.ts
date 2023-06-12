import { MiddlewareInterface } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../../types';
import { ConfigServiceInterface } from '../../config/config.service.interface';
import { StorageServiceInterface } from '../../service/storage/storage.service.interface';
import { LanguageEnum } from '../../language/dictionary/language/language.enum';
import { AllowedTokenEnum } from '../../service/storage/allowed.token.enum';

export class LanguageMiddleware implements MiddlewareInterface {
	static readonly ALLOWED_LANGS = ['en', 'ru'];
	static readonly DEFAULT_LANG_KEY = 'DEFAULT_LANG';
	constructor(
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {}
	public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		let lang: string | string[] | undefined = req.headers[LanguageEnum.LANG_HEADER_NAME];
		if (Array.isArray(lang)) {
			lang = lang[0];
		}
		const savedLang = await this.storageService.getKeyValue<string | undefined>(
			AllowedTokenEnum.LANGUAGE,
		);
		if (lang && savedLang !== lang && this.isAllowedLang(lang)) {
			await this.storageService.saveKeyValue(AllowedTokenEnum.LANGUAGE, lang);
		}
		if (!lang || !this.isAllowedLang(lang)) {
			await this.storageService.saveKeyValue(
				AllowedTokenEnum.LANGUAGE,
				this.configService.get(LanguageMiddleware.DEFAULT_LANG_KEY),
			);
		}

		next();
	}

	private isAllowedLang(lang: string): boolean {
		return LanguageMiddleware.ALLOWED_LANGS.includes(lang);
	}
}

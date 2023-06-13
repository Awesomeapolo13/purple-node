import { MiddlewareInterface } from './middleware.interface';
import { Request, NextFunction, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { StorageServiceInterface } from '../../service/storage/storage.service.interface';
import { AllowedTokenEnum } from '../../service/storage/allowed.token.enum';
import { ValidationErrorCodeEnum } from '../error/validation.error.code.enum';
import { LogLanguageDictionary } from '../../language/dictionary/language/log.language.dictionary';
import { LanguageType } from '../../language/dictionary/language/language.type';

export class ValidateMiddleware implements MiddlewareInterface {
	constructor(
		private classToValidate: ClassConstructor<object>,
		private readonly storageService: StorageServiceInterface,
	) {}

	public async execute(
		{ method, query, body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const lang: LanguageType = await this.storageService.getKeyValue<LanguageType>(
			AllowedTokenEnum.LANGUAGE,
		);
		const dto = await this.mapToDto(method, query, body);
		const errors = await this.getErrors(dto, lang);
		// Определить сообщение об ошибрах по их ключам.
		errors.length > 0 ? res.status(400).send(errors) : next();
	}

	private async mapToDto(method: string, query: any, body: any): Promise<object> {
		switch (method) {
			case 'GET':
				return plainToInstance(this.classToValidate, query);
			case 'POST':
				return plainToInstance(this.classToValidate, body);
			default:
				return plainToInstance(this.classToValidate, null);
		}
	}

	private async getErrors(dto: object, language: LanguageType): Promise<ValidationError[]> {
		const errors = await validate(dto);
		// Меняем коды ошибок на их реальные значения из словаря.
		for (const error of errors) {
			for (const constraint in error.constraints) {
				switch (error.constraints[constraint]) {
					case ValidationErrorCodeEnum.LANG_IS_EMPTY_CODE:
						error.constraints[constraint] = LogLanguageDictionary[language].langIsEmptyMsg;
						break;
					case ValidationErrorCodeEnum.WRONG_CITY_SET_UP_CODE:
						error.constraints[constraint] = LogLanguageDictionary[language].wrongCitySetUpMsg;
						break;
					case ValidationErrorCodeEnum.TOKEN_IS_EMPTY_CODE:
						error.constraints[constraint] = LogLanguageDictionary[language].tokenIsEmptyMsg;
						break;
					case ValidationErrorCodeEnum.WRONG_TOKEN_SET_UP_CODE:
						error.constraints[constraint] = LogLanguageDictionary[language].wrongTokenSetUpMsg;
						break;
					default:
						error.constraints[constraint] = LogLanguageDictionary[language].smtWentWrong;
				}
			}
		}

		return errors;
	}
}

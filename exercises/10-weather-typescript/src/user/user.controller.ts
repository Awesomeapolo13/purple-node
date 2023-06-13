import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { UserControllerInterface } from './user.controller.interface';
import { UserLoginDto } from './user-login.dto';
import { UserHandlerInterface } from './user.handler.interface';
import { ValidateMiddleware } from '../common/middleware/validate.middleware';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { LogLanguageDictionary } from '../language/dictionary/language/log.language.dictionary';
import { LanguageType } from '../language/dictionary/language/language.type';
import { HttpCodeEnum } from '../common/error/http.code.enum';

/**
 * Контроллер пользователей.
 */
@injectable()
export class UserController extends BaseController implements UserControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
		@inject(TYPES.UserHandler) private userHandler: UserHandlerInterface,
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto, this.storageService)],
			},
		]);
	}

	public async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			this.ok(res, {
				success: true,
				message: await this.userHandler.handleLogin(body),
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

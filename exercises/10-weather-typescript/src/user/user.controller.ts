import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { UserControllerInterface } from './user.controller.interface';
import { UserLoginDto } from './user-login.dto';
import { UserHandlerInterface } from './user.handler.interface';
import { HttpError } from '../common/error/http.error';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { LogLanguageDictionary } from '../dictionary/language/log.language.dictionary';
import { LanguageType } from '../dictionary/language/language.type';
import { sign } from 'jsonwebtoken';

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
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
		]);
	}

	public async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
		const result = await this.userHandler.handleLogin(body);
		if (!result) {
			return next(new HttpError(400, LogLanguageDictionary[langKey].wrongTokenSetUpMsg));
		}

		this.ok(res, {
			success: true,
			message: LogLanguageDictionary[langKey].saveTokenSuccess,
		});
	}
}

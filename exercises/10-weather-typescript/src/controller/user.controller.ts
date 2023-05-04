import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';
import { UserControllerInterface } from './user.controller.interface';
import { UserLoginDto } from "../handlers/dto/user-login.dto";
import { UserRegisterDto } from "../handlers/dto/user-register.dto";
/**
 * Контроллер пользователей.
 */
@injectable()
export class UserController extends BaseController implements UserControllerInterface {
	constructor(
		@inject(TYPES.LoggerInterface) protected logger: LoggerInterface
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
		]);
	}

	public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, 'login');
	}

	public register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, 'register');
	}
}

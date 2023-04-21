import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { NextFunction, Request, Response } from "express";

/**
 * Контроллер пользователей.
 */
export class UserController extends BaseController {
    constructor(
        protected logger: LoggerService
    ) {
        super(logger);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register
            },
            {
                path: '/login',
                method: 'post',
                func: this.login
            }
        ])
    }

    public login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }

    public register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}

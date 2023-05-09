import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './controller/user.controller';
import { LoggerInterface } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ExceptionFilterInterface } from './service/error/exception.filter.interface';
import {HelpController} from "./controller/help.controller";

@injectable()
export class App {
	public app: Express;
	public port: number;
	public server: Server;

	constructor(
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.HelpController) private helpController: HelpController,
		@inject(TYPES.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
	) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	public useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/help', this.helpController.router)
	}

	public useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public useMiddleware(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded());
	}
}

import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerInterface } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ExceptionFilterInterface } from './service/error/exception.filter.interface';
import { ConfigServiceInterface } from './config/config.service.interface';
import { HelpController } from './controller/help.controller';
import { UserController } from './controller/user.controller';
import { CityController } from './controller/city.controller';
import { LanguageController } from './controller/language.controller';
import { WeatherController } from './controller/weather.controller';

@injectable()
export class App {
	public app: Express;
	public port: number;
	public server: Server;

	constructor(
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.HelpController) private helpController: HelpController,
		@inject(TYPES.CityController) private cityController: CityController,
		@inject(TYPES.LanguageController) private languageController: LanguageController,
		@inject(TYPES.WeatherController) private weatherController: WeatherController,
		@inject(TYPES.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
		@inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
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

	public close(): void {
		this.server.close();
	}

	public useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/help', this.helpController.router);
		this.app.use('/city', this.cityController.router);
		this.app.use('/lang', this.languageController.router);
		this.app.use('/weather', this.weatherController.router);
	}

	public useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public useMiddleware(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded());
	}
}

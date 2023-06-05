import { App } from './src/app';
import { LoggerService } from './src/logger/logger.service';
import { UserController } from './src/user/user.controller';
import { ExceptionFilter } from './src/common/error/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerInterface } from './src/logger/logger.interface';
import { TYPES } from './types';
import { ExceptionFilterInterface } from './src/common/error/exception.filter.interface';
import { UserHandlerInterface } from './src/user/user.handler.interface';
import { UserHandler } from './src/user/user.handler';
import { UserControllerInterface } from './src/user/user.controller.interface';
import { StorageServiceInterface } from './src/service/storage/storage.service.interface';
import { StorageService } from './src/service/storage/storage.service';
import { HelpHandlerInterface } from './src/help/help.handler.interface';
import { HelpHandler } from './src/help/help.handler';
import { HelpControllerInterface } from './src/help/help.controller.interface';
import { HelpController } from './src/help/help.controller';
import { CityHandlerInterface } from './src/city/city.handler.interface';
import { CityControllerInterface } from './src/city/city.controller.interface';
import { CityController } from './src/city/city.controller';
import { CityHandler } from './src/city/city.handler';
import { ConfigServiceInterface } from './src/config/config.service.interface';
import { ConfigService } from './src/config/config.service';
import { LanguageControllerInterface } from './src/language/language.controller.interface';
import { LanguageController } from './src/language/language.controller';
import { LanguageHandlerInterface } from './src/language/language.handler.interface';
import { LanguageHandler } from './src/language/language.handler';
import { WeatherControllerInterface } from './src/weather/weather.controller.interface';
import { WeatherController } from './src/weather/weather.controller';
import { WeatherHandlerInterface } from './src/weather/weather.handler.interface';
import { WeatherHandler } from './src/weather/weather.handler';
import { ApiServiceInterface } from './src/service/weather.api/api.service.interface';
import { ApiService } from './src/service/weather.api/api.service';

export interface BootstrapInterface {
	appContainer: Container;
	app: App;
}

/**
 * привязываем сервисы к контейнеру
 */
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService).inSingletonScope();
	bind<ExceptionFilterInterface>(TYPES.ExceptionFilterInterface).to(ExceptionFilter);
	// Controllers
	bind<UserControllerInterface>(TYPES.UserController).to(UserController);
	bind<HelpControllerInterface>(TYPES.HelpController).to(HelpController);
	bind<CityControllerInterface>(TYPES.CityController).to(CityController);
	bind<LanguageControllerInterface>(TYPES.LanguageController).to(LanguageController);
	bind<WeatherControllerInterface>(TYPES.WeatherController).to(WeatherController);
	// Handlers
	bind<UserHandlerInterface>(TYPES.UserHandler).to(UserHandler);
	bind<HelpHandlerInterface>(TYPES.HelpHandler).to(HelpHandler);
	bind<CityHandlerInterface>(TYPES.CityHandler).to(CityHandler);
	bind<LanguageHandlerInterface>(TYPES.LanguageHandler).to(LanguageHandler);
	bind<WeatherHandlerInterface>(TYPES.WeatherHandler).to(WeatherHandler);
	// Ohter services
	bind<StorageServiceInterface>(TYPES.StorageService).to(StorageService);
	bind<ConfigServiceInterface>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<ApiServiceInterface>(TYPES.ApiService).to(ApiService);
	bind<App>(TYPES.Application).to(App);
});

// Регистрация сервисов в контейнере.
async function bootstrap(): Promise<BootstrapInterface> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	// Запуск приложения.
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();

	return { app, appContainer };
}

export const boot = bootstrap();

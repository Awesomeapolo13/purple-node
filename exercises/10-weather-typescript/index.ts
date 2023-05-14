import { App } from "./src/app";
import { LoggerService } from "./src/logger/logger.service";
import { UserController } from "./src/controller/user.controller";
import { ExceptionFilter } from "./src/service/error/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { LoggerInterface } from "./src/logger/logger.interface";
import { TYPES } from "./types";
import { ExceptionFilterInterface } from "./src/service/error/exception.filter.interface";
import {UserHandlerInterface} from "./src/handlers/user.handler.interface";
import {UserHandler} from "./src/handlers/user.handler";
import {UserControllerInterface} from "./src/controller/user.controller.interface";
import {StorageServiceInterface} from "./src/service/storage/storage.service.interface";
import {StorageService} from "./src/service/storage/storage.service";
import {HelpHandlerInterface} from "./src/handlers/help.handler.interface";
import {HelpHandler} from "./src/handlers/help.handler";
import {HelpControllerInterface} from "./src/controller/help.controller.interface";
import {HelpController} from "./src/controller/help.controller";
import {CityHandlerInterface} from "./src/handlers/city.handler.interface";
import {CityControllerInterface} from "./src/controller/city.controller.interface";
import {CityController} from "./src/controller/city.controller";
import {CityHandler} from "./src/handlers/city.handler";
import {ConfigServiceInterface} from "./src/config/config.service.interface";
import {ConfigService} from "./src/config/config.service";
import {LanguageControllerInterface} from "./src/controller/language.controller.interface";
import {LanguageController} from "./src/controller/language.controller";
import {LanguageHandlerInterface} from "./src/handlers/language.handler.interface";
import {LanguageHandler} from "./src/handlers/language.handler";

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
    // Handlers
    bind<UserHandlerInterface>(TYPES.UserHandler).to(UserHandler);
    bind<HelpHandlerInterface>(TYPES.HelpHandler).to(HelpHandler);
    bind<CityHandlerInterface>(TYPES.CityHandler).to(CityHandler);
    bind<LanguageHandlerInterface>(TYPES.LanguageHandler).to(LanguageHandler);
    // Ohter services
    bind<StorageServiceInterface>(TYPES.StorageService).to(StorageService)
    bind<ConfigServiceInterface>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
    bind<App>(TYPES.Application).to(App);
});

// Регистрация сервисов в контейнере.
function bootstrap(): BootstrapInterface {
    const appContainer = new Container();
    appContainer.load(appBindings);
    // Запуск приложения.
    const app = appContainer.get<App>(TYPES.Application);
    app.init();

    return { app, appContainer };
}

export const { app, appContainer } = bootstrap();

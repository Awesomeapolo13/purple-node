import { App } from "./src/app";
import { LoggerService } from "./src/logger/logger.service";
import { UserController } from "./src/controller/user.controller";
import { ExceptionFilter } from "./src/service/error/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { LoggerInterface } from "./src/logger/logger.interface";
import { TYPES } from "./types";
import { ExceptionFilterInterface } from "./src/service/error/exception.filter.interface";

export interface BootstrapInterface {
    appContainer: Container;
    app: App;
}

/**
 * привязываем сервисы к контейнеру
 */
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService);
    bind<ExceptionFilterInterface>(TYPES.ExceptionFilterInterface).to(ExceptionFilter);
    bind<UserController>(TYPES.UserController).to(UserController);
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


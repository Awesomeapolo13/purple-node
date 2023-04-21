import { App } from "./src/app";
import { LoggerService } from "./src/logger/logger.service";
import { UserController } from "./src/controller/user.controller";
import { ExceptionFilter } from "./src/service/error/exception.filter";

/**
 * Функция запуска приложения.
 */
async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(
        logger,
        new UserController(logger),
        new ExceptionFilter(logger)
    );
    await app.init();
}

bootstrap();

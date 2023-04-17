import { App } from "./src/app";
import { LoggerService } from "./src/logger/logger.service";

/**
 * Функция запуска приложения.
 */
async function bootstrap() {
    const app = new App(new LoggerService());
    await app.init();
}

bootstrap();

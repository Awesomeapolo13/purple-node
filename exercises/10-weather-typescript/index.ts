import { App } from "./src/app";

/**
 * Функция запуска приложения.
 */
async function bootstrap() {
    const app = new App();
    await app.init();
}

bootstrap();

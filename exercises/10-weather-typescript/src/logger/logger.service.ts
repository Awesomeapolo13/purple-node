import { Logger } from 'tslog';
import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';

// Пометка декоратором, отмечаем что можно поместить этот сервис в контейнер.
@injectable()
export class LoggerService implements LoggerInterface {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}

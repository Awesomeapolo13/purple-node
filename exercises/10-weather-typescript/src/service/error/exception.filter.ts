import { NextFunction, Request, Response } from 'express';
import { ExceptionFilterInterface } from './exception.filter.interface';
import { HttpError } from './http.error';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../logger/logger.interface';
import { TYPES } from '../../../types';

/**
 * Обработчик ошибок.
 */
@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
	// С помощью декоратора устанавливаем инстанс логгера.
	constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {}

	public catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
			res.status(err.statusCode).send({
				err: err.message,
			});
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({
				err: err.message,
			});
		}
	}
}

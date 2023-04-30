import { NextFunction, Request, Response } from 'express';

/**
 * Интерфейс обработчиков ошибок.
 */
export interface ExceptionFilterInterface {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

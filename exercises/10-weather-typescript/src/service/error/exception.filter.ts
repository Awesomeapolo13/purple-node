import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../../logger/logger.service";
import { ExceptionFilterInterface } from "./exception.filter.interface";
import {HttpError} from "./http.error";

/**
 * Обработчик ошибок.
 */
export class ExceptionFilter implements ExceptionFilterInterface{
    constructor(
        private logger: LoggerService
    ) {
        this.logger = logger;
    }

    public catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpError) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({
                err: err.message,
            })
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({
                err: err.message,
            })
        }
    }
}

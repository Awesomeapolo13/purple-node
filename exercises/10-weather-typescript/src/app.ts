import express, { Express }  from "express";
import { Server } from 'http';
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./controller/user.controller";
import { ExceptionFilter } from "./service/error/exception.filter";
import { LoggerInterface } from "./logger/logger.interface";

export class App {
    public app: Express;
    public port: number;
    public server: Server;
    private logger: LoggerService;
    userController: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerInterface,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }

    public useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    public useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }
}

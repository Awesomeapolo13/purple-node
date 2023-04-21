import express, { Express }  from "express";
import { Server } from 'http';
import { LoggerService } from "./logger/logger.service";
import {UserController} from "./controller/user.controller";

export class App {
    public app: Express;
    public port: number;
    public server: Server;
    private logger: LoggerService;
    userController: UserController;

    constructor(
        logger: LoggerService,
        userController: UserController
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }

    public useRoutes() {
        this.app.use('/users', this.userController.router);
    }
}

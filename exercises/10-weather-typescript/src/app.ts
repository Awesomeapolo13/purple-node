import express, { Express }  from "express";
import { Server } from 'http';
import { userRouter } from "./routes/users/users";
import { LoggerService } from "./logger/logger.service";

export class App {
    public app: Express;
    public port: number;
    public server: Server;
    private logger: LoggerService

    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }

    public useRoutes() {
        this.app.use('/users', userRouter);
    }
}

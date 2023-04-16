import express, { Express }  from "express";
import { Server } from 'http';
import { userRouter } from "./routes/users/users";

export class App {
    public app: Express;
    public port: number;
    public server: Server;

    constructor() {
        this.app = express();
        this.port = 8000;
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log(`Сервер запущен на http://localhost:${this.port}`);
    }

    public useRoutes() {
        this.app.use('/users', userRouter);
    }
}

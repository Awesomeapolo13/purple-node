import { LoggerService } from "../logger/logger.service";
import { Response, Router } from 'express'
import { RouteInterface } from "./route.interface";
export { Router } from 'express'

export abstract class BaseController {
    private readonly _router: Router

    constructor(
        protected logger: LoggerService
    ) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);

    }

    public ok<T>(res: Response, message: T) {
        this.send<T>(res, 200, message);
    }

    /**
     * Регистрирует роуты.
     */
    protected bindRoutes(routes: RouteInterface[]) {
        for(const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`)
            // Сохраняем контекст контроллера для передачи его в функцию ниже.
            route.func.bind(this);
            this._router[route.method](route.path, route.func);
        }
    }
}
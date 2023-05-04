import { Response, Router } from 'express';
import { ExpressReturnType, RouteInterface } from './route.interface';
import { LoggerInterface } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
export { Router } from 'express';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(protected logger: LoggerInterface) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	/**
	 * Регистрирует роуты.
	 */
	protected bindRoutes(routes: RouteInterface[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			// Сохраняем контекст контроллера для передачи его в функцию ниже.
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}

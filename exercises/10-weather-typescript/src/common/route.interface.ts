import { NextFunction, Request, Response, Router } from 'express';
import { MiddlewareInterface } from "./middleware.interface";

export interface RouteInterface {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
	middlewares?: MiddlewareInterface[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;

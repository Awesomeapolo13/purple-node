import { NextFunction, Request, Response } from 'express';

export interface HelpControllerInterface {
	help: (req: Request, res: Response, next: NextFunction) => void;
}

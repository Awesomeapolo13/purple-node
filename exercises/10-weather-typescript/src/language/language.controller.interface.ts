import { NextFunction, Request, Response } from 'express';

export interface LanguageControllerInterface {
	langSet: (req: Request, res: Response, next: NextFunction) => void;
}

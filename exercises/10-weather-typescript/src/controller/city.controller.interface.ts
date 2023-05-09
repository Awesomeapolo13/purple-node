import {NextFunction, Request, Response} from "express";

export interface CityControllerInterface {
    handleCityAdd: (req: Request, res: Response, next: NextFunction) => void;
    handleCityRemove: (req: Request, res: Response, next: NextFunction) => void;
}
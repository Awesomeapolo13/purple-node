// Файл содержит символы для связывания объектов (для DI)
import {UserController} from "./src/controller/user.controller";
import {ExceptionFilterInterface} from "./src/service/error/exception.filter.interface";

export const TYPES = {
    Application: Symbol('Application'),
    LoggerInterface: Symbol('LoggerInterface'),
    LoggerService: Symbol('LoggerService'),
    UserController: Symbol('UserController'),
    ExceptionFilterInterface: Symbol('ExceptionFilterInterface'),
};
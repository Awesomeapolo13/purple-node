// Файл содержит символы для связывания объектов (для DI)
import {UserController} from "./src/controller/user.controller";
import {ExceptionFilterInterface} from "./src/service/error/exception.filter.interface";

export const TYPES = {
    Application: Symbol('Application'),
    // Controllers
    UserController: Symbol('UserController'),
    HelpController: Symbol('HelpController'),
    // Handlers
    UserHandlerInterface: Symbol('UserHandlerInterface'),
    UserHandler: Symbol('UserHandler'),
    HelpHandlerInterface: Symbol('HelpHandlerInterface'),
    HelpHandler: Symbol('HelpHandler'),
    // Other services
    LoggerInterface: Symbol('LoggerInterface'),
    LoggerService: Symbol('LoggerService'),
    ExceptionFilterInterface: Symbol('ExceptionFilterInterface'),
    StorageServiceInterface: Symbol('StorageServiceInterface'),
    StorageService: Symbol('StorageService'),
};

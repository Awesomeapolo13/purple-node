import 'reflect-metadata';
import {Container} from "inversify";
import {ConfigServiceInterface} from "../config/config.service.interface";
import {UserHandlerInterface} from "./user.handler.interface";
import {TYPES} from "../../types";
import {UserHandler} from "./user.handler";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";

// Создаем моки, реализующие интерфейсы
const ConfigServiceMock: ConfigServiceInterface = {
    get: jest.fn(),
};

const StorageServiceMock: StorageServiceInterface = {
    isExists: jest.fn(),
    getKeyValue: jest.fn(),
    saveKeyValue: jest.fn(),
    addKeyValue: jest.fn(),
    removeKeyValue: jest.fn(),
}

const container = new Container();
let configService: ConfigServiceInterface;
let storageService: StorageServiceInterface;
let userHandler: UserHandlerInterface

// Биндим зависимости (тестируемый сервис и моки).
beforeAll(() => {
    container.bind<UserHandlerInterface>(TYPES.UserHandler).to(UserHandler);
    container.bind<ConfigServiceInterface>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
    container.bind<StorageServiceInterface>(TYPES.StorageService).toConstantValue(StorageServiceMock);

    configService = container.get<ConfigServiceInterface>(TYPES.ConfigService);
    userHandler = container.get<UserHandlerInterface>(TYPES.UserHandler);
    storageService = container.get<StorageServiceInterface>(TYPES.StorageService);
});

describe('User Handler', () => {
    it('handleLogin', async () => {
        // Определяем что должна вернуть конкретна имплеменация метода мока.
        storageService.saveKeyValue = jest.fn().mockImplementationOnce(
            (key: string, value: any): void => undefined
        );
        const isTokenSaved = await userHandler.handleLogin({
            token: 'fe615a05def503c6ce8375a861a98fff'
        });
        expect(isTokenSaved).toBeTruthy();
    });
});

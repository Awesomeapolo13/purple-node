import {BaseController} from "../common/base.controller";
import {LanguageControllerInterface} from "./language.controller.interface";
import {NextFunction, Request, Response} from 'express';
import {LanguageType} from "../dictionary/language/language.type";
import {AllowedTokenEnum} from "../service/storage/allowed.token.enum";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {LoggerInterface} from "../logger/logger.interface";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";
import {ValidateMiddleware} from "../common/validate.middleware";
import {LanguageDto} from "../handlers/dto/language.dto";
import {LanguageHandlerInterface} from "../handlers/language.handler.interface";
import {LogLanguageDictionary} from "../dictionary/language/log.language.dictionary";
import {HttpError} from "../service/error/http.error";

@injectable()
export class LanguageController extends BaseController implements LanguageControllerInterface{
    constructor(
        @inject(TYPES.LoggerInterface) protected logger: LoggerInterface,
        @inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
        @inject(TYPES.LanguageHandler) private readonly languageHandler: LanguageHandlerInterface
    ) {
        super(logger);
        this.bindRoutes([
            {
                path: '/set',
                method: 'post',
                func: this.langSet,
                middlewares: [new ValidateMiddleware(LanguageDto)]
            }
        ]);
    }
    public async langSet(
        { body }: Request<{}, {}, LanguageDto>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const langKey: LanguageType = await this.storageService.getKeyValue(AllowedTokenEnum.LANGUAGE);
        let message: string = LogLanguageDictionary[langKey].langIsEmptyMsg;
        try {
            message = await this.languageHandler.handleLangSet(body);
        } catch (e) {
            return next(new HttpError(400, LogLanguageDictionary[langKey].smtWentWrong));
        }

        this.ok(res, {
            success: true,
            message: message
        });
    }
}

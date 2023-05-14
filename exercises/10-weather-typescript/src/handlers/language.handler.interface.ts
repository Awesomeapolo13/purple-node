import {LanguageDto} from "./dto/language.dto";

export interface LanguageHandlerInterface {
    handleLangSet: (langDto: LanguageDto) => Promise<string>
}

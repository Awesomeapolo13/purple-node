import { LanguageDto } from './language.dto';

export interface LanguageHandlerInterface {
	handleLangSet: (langDto: LanguageDto) => Promise<string>;
}

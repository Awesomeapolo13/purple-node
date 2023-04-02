import { logLanguageDict } from '../dictionaries/log.language.dictionary.js';
import {saveKeyValue, TOKEN_DICTIONARY} from '../services/storage.service.js';

/**
 * Обработчик роутов /help
 */
const handleLangSet = async (reqBody) => {
    const lang = reqBody.lang;
    await saveKeyValue(TOKEN_DICTIONARY.language, lang.toLowerCase());

    return {
        success: true,
        message: logLanguageDict[lang].saveLangSuccess,
    }
}

export { handleLangSet };

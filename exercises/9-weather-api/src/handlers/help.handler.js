import { logLanguageDict } from '../dictionaries/log.language.dictionary.js';
import { getKeyValue, TOKEN_DICTIONARY } from '../services/storage.service.js';

/**
 * Обработчик роутов /help
 */
const handleHelp = async () => {
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language ) ?? 'ru';

    return {
        success: true,
        help: {
            info: logLanguageDict[langKey].help
        },
    }
}

export { handleHelp };

import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from '../services/storage.service.js';
import {logLanguageDict} from '../dictionaries/log.language.dictionary.js';

const handleLogin = async (reqBody) => {
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language)
    if (!reqBody.token) {
        throw Error(logLanguageDict[langKey].tokenEmptyForLogin);
    }

    await saveKeyValue(TOKEN_DICTIONARY.token, reqBody.token);

    return {
        success: true,
        message: 'Временной сообщение',
    }
};

export { handleLogin };

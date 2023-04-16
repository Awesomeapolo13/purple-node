import { logLanguageDict } from '../dictionaries/log.language.dictionary.js';
import {addKeyValue, removeKeyValue, getKeyValue, TOKEN_DICTIONARY} from '../services/storage.service.js';

const setResponse = (isSuccess, message) => {
    return {
        success: isSuccess,
        message: message,
    }
}

const handleCityAdd = async (reqBody) => {
    const city = reqBody.city;
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language);
    const cityList = await getKeyValue(TOKEN_DICTIONARY.city);
    let message = logLanguageDict[langKey].cityIsExists;

    if (!cityList.includes(city)) {
        await addKeyValue(TOKEN_DICTIONARY.city, city);
        message = logLanguageDict[langKey].saveCitySuccess;
    }

    return setResponse(true, message);
}

const handleCityRemove = async (reqBody) => {
    const city = reqBody.city;
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language);
    const cityList = await getKeyValue(TOKEN_DICTIONARY.city);
    let message = logLanguageDict[langKey].cityIsNotExists;

    if (cityList.includes(city)) {
        await removeKeyValue(TOKEN_DICTIONARY.city, city);
        message = logLanguageDict[langKey].removeCitySuccess;
    }

    return setResponse(true, message);
}

export { handleCityAdd, handleCityRemove };

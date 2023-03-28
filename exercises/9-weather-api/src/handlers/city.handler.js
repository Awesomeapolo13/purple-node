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
    const cityList = await getKeyValue(TOKEN_DICTIONARY.city);
    let message = 'Данный город уже присутствует в списке.'

    if (!cityList.includes(city)) {
        await addKeyValue(TOKEN_DICTIONARY.city, city);
        message = 'Город успешно сохранен.';
    }

    return setResponse(true, message);
}

const handleCityRemove = async (reqBody) => {
    const city = reqBody.city;
    const cityList = await getKeyValue(TOKEN_DICTIONARY.city);
    let message = 'Данный город уже отсутствует в списке.'

    if (cityList.includes(city)) {
        await removeKeyValue(TOKEN_DICTIONARY.city, city);
        message = 'Город успешно удален.';
    }

    return setResponse(true, message);
}

export { handleCityAdd, handleCityRemove };

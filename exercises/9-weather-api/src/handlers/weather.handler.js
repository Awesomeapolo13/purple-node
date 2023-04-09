import {logLanguageDict} from '../dictionaries/log.language.dictionary.js';
import {getKeyValue, TOKEN_DICTIONARY} from '../services/storage.service.js';
import {getIcon, getWeather} from '../services/api.service.js';

const getWeatherStructure = async (weather) => {
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language) ?? 'ru';
    const icon = getIcon(weather.weather[0].icon);

    return logLanguageDict[langKey].weather(weather, icon);
}

const handleCityWeatherGet = async (reqBody) => {
    const weather = await getWeather(reqBody.city);

    return {
        success: true,
        weather: await getWeatherStructure(weather),
    };
}

const handleAllWeatherListGet = async () => {
    const cities = await getKeyValue(TOKEN_DICTIONARY.city);
    const response = {
        success: true,
        weatherList: []
    };

    for (const city of cities) {
        let weather = await getWeather(city);
        response.weatherList.push(await getWeatherStructure(weather));
    }

    return response;
}

export {handleCityWeatherGet, handleAllWeatherListGet};

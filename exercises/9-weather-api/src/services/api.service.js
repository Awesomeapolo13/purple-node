import axios from 'axios';
import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js';

const ICON_DICTIONARY = {
    '01': '☀️',
    '02': '🌤️',
    '03': '☁️',
    '04': '☁️',
    '09': '🌧️',
    '10': '🌦️',
    '11': '🌩️',
    '13': '❄️',
    '50': '🌫️',
};

const getIcon = (icon) => {
    return ICON_DICTIONARY[icon.slice(0, -1)] !== undefined
        ? ICON_DICTIONARY[icon.slice(0, -1)]
        : '';
};

const getWeather = async (city) => {
    const apiKey = await getKeyValue(TOKEN_DICTIONARY.token);
    const lang = await getKeyValue(TOKEN_DICTIONARY.language);
    if (!apiKey) {
        throw new Error('Не задан API key, задайте его через команду -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: apiKey,
            lang: lang ?? 'ru',
            units: 'metric',
        }
    });

    return data;
};

export { getWeather, getIcon };
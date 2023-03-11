import axios from 'axios';
import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js';

const getWeather = async (city) => {
    const apiKey = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!apiKey) {
        throw new Error('Не задан API key, задайте его через команду -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: apiKey,
            lang: 'ru',
            units: 'metric',
        }
    });

    return data;
};

export { getWeather };
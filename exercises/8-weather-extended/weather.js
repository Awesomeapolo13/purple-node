#!/usr/bin/env node
import { getArgs } from './src/helpers/args-resolver.js';
import { printHelp, printSuccess, printError, printWeather } from './src/services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './src/services/storage.service.js';
import { getWeather, getIcon } from './src/services/api.service.js';

/*
 * ToDO:
 *  1) Добавить сохранение нескольких городов.
 *  2) Сделать получение погоды для всех переданных городов.
 *  3) Сделать настройку языка и отображать результаты на русском или английском языках.
 */

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен')
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен');
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    switch (true) {
        case args.h !== null && args.h !== undefined:
            return printHelp();
        case args.s !== null && args.s !== undefined:
            return saveCity(args.s)
        case args.t !== null && args.t !== undefined:
            return saveToken(args.t)
    }
    return getForecast('Moscow');
};

initCLI();

#!/usr/bin/env node
import { getArgs } from './src/helpers/args-resolver.js';
import { printHelp, printSuccess, printError, printWeather, getLangSetUp } from './src/services/log.service.js';
import {saveKeyValue, TOKEN_DICTIONARY, getKeyValue, addKeyValue, removeKeyValue} from './src/services/storage.service.js';
import { getWeather, getIcon } from './src/services/api.service.js';
import {logLanguageDict} from "./src/dictionaries/log.language.dictionary.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError(logLanguageDict[await getLangSetUp()].tokenIsEmptyMsg);
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess(logLanguageDict[await getLangSetUp()].saveTokenSuccess)
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError(logLanguageDict[await getLangSetUp()].cityIsEmptyMsg);
        return;
    }

    try {
        await addKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess(logLanguageDict[await getLangSetUp()].saveCitySuccess);
    } catch (e) {
        printError(e.message);
    }
}

const removeCity = async (city) => {
    if (!city.length) {
        printError(logLanguageDict[await getLangSetUp()].cityIsEmptyMsg);
        return;
    }

    try {
        await removeKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess(logLanguageDict[await getLangSetUp()].removeCitySuccess);
    } catch (e) {
        printError(e.message);
    }
}

const saveLang = async (lang) => {
    if (!lang.length) {
        printError(logLanguageDict[await getLangSetUp()].langIsEmptyMsg);
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.language, lang);
        printSuccess(logLanguageDict[await getLangSetUp()].saveLangSuccess);
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const cities = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

        for (const city of cities) {
            const weather = await getWeather(city);
            await printWeather(weather, getIcon(weather.weather[0].icon));
        }
    } catch (e) {
        if (e?.response?.status === 404) {
            printError(logLanguageDict[await getLangSetUp()].wrongCitySetUpMsg);
        } else if (e?.response?.status === 401) {
            printError(logLanguageDict[await getLangSetUp()].wrongTokenSetUpMsg);
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
        case args.r !== null && args.r !== undefined:
            return removeCity(args.r);
        case args.t !== null && args.t !== undefined:
            return saveToken(args.t)
        case args.l !== null && args.l !== undefined:
            return saveLang(args.l)
    }
    return getForecast();
};

initCLI();

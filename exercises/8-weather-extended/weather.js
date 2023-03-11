#!/usr/bin/env node
import { getArgs } from './src/helpers/args-resolver.js';
import { printHelp, printSuccess, printError } from './src/services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './src/services/storage.service.js';
import { getWeather } from './src/services/api.service.js';

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

const initCLI = () => {
    const args = getArgs(process.argv);
    switch (true) {
        case args.h !== null && args.h !== undefined:
            printHelp();
            break;
        case args.s !== null && args.s !== undefined:
            // Save city
            break;
        case args.t !== null && args.t !== undefined:
            return saveToken(args.t)
    }
    getWeather('Moscow');
};

initCLI();

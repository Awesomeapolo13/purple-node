#!/usr/bin/env node
import { getArgs } from './src/helpers/args-resolver.js';
import { printHelp, printSuccess, printError } from './src/services/log.service.js';
import {saveKeyValue} from "./src/services/storage.service.js";

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен')
    } catch (e) {
        printError(e.message);
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    switch (true) {
        case args.h !== null:
            printHelp();
            break;
        case args.s !== null:
            // Save city
            break;
        case args.t !== null:
            return saveToken(args.t)
    }
    // Show the weather
};

initCLI();

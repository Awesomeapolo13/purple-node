#!/usr/bin/env node
import { getArgs } from './src/helpers/args-resolver.js';
import {printHelp} from './src/services/log.service.js';

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
            // Save token
            break;
    }
    // Show the weather
};

initCLI();

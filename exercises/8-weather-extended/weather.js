#!/usr/bin/env node
import { getArgs } from './src/helpers/args-resolver.js';

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);
    switch (args) {
        case args.h !== null:
            // Show help block
            break;
        case args.s !== null:
            // Save city
            break;
        case args.t !== null:
            // Save token
            break;
    }
};

initCLI();

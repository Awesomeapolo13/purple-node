import chalk from 'chalk';
import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js';
import { logLanguageDict } from '../dictionaries/log.language.dictionary.js';

const getLangSetUp = async () => {
    return await getKeyValue(TOKEN_DICTIONARY.language ?? 'ru');
}

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = async () => {
    console.log(
        logLanguageDict[await getLangSetUp()].help
    );
};

const printWeather =  async (res, icon) => {
    console.log(
        logLanguageDict[await getLangSetUp()].weather(res, icon)
    );
}

export { printError, printSuccess, printHelp, printWeather, getLangSetUp };
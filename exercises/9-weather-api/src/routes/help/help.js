import express from 'express';
import { handleHelp } from '../../handlers/help.handler.js';
import {getKeyValue, TOKEN_DICTIONARY} from '../../services/storage.service.js';
import {logLanguageDict} from '../../dictionaries/log.language.dictionary.js';

const helpRouter = express.Router();

helpRouter.get('/help', async (req, res) => {
    try {
        res.status(200).json(await handleHelp())
    } catch (err) {
        const langKey = await getKeyValue(TOKEN_DICTIONARY.language ) ?? 'ru';
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: logLanguageDict[langKey].smtWentWrong,
        });
    }
});

export { helpRouter };

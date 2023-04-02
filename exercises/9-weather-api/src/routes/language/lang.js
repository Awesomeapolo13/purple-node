import express from 'express';
import {handleLangSet} from '../../handlers/lang.handler.js';
import {getKeyValue, TOKEN_DICTIONARY} from '../../services/storage.service.js';
import {logLanguageDict} from '../../dictionaries/log.language.dictionary.js';

const languageRouter = express.Router();

/**
 * Вернет ошибку, если тело запроса не валидно.
 */
const checkBody = async (reqBody) => {
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language);

    if (!reqBody.lang) {
        throw new Error(logLanguageDict[langKey].langIsEmptyMsg);
    }

    if (!logLanguageDict.availableLangs.includes(reqBody.lang)) {
        throw new Error(logLanguageDict[langKey].isNotAvailableLang);
    }


    return Boolean(reqBody.lang);
}

languageRouter.post('/set', async (req, res) => {
    try {
        const reqBody = req.body;
        await checkBody(reqBody);
        res.status(200).json(await handleLangSet(reqBody));
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

export {languageRouter};

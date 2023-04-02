import express from 'express';
import { handleCityAdd, handleCityRemove } from '../../handlers/city.handler.js';
import {getKeyValue, TOKEN_DICTIONARY} from "../../services/storage.service.js";
import {logLanguageDict} from "../../dictionaries/log.language.dictionary.js";

const cityRouter = express.Router();

/**
 * Вернет ошибку, если тело запроса не валидно.
 */
const checkBody = async (reqBody) => {
    if (!reqBody.city) {
        const langKey = await getKeyValue(TOKEN_DICTIONARY.language);
        throw new Error(logLanguageDict[langKey].cityIsEmptyMsg);
    }

    return Boolean(reqBody.city);
}

cityRouter.post('/add', async (req, res) => {
    try {
        const reqBody = req.body;
        await checkBody(reqBody);
        res.status(200).json(await handleCityAdd(reqBody))
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

cityRouter.post('/remove', async (req, res) => {
    try {
        const reqBody = req.body;
        await checkBody(reqBody);
        res.status(200).json(await handleCityRemove(reqBody))
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

export { cityRouter };

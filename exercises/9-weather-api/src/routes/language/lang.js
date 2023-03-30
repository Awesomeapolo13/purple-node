import express from 'express';
import {handleLangSet} from '../../handlers/lang.handler.js';

const languageRouter = express.Router();

/**
 * Вернет ошибку, если тело запроса не валидно.
 */
const checkBody = (reqBody) => {
    if (reqBody.lang) {
        throw new Error('Не передан язык');
    }

    return Boolean(reqBody.lang);
}

languageRouter.post('/set', async (req, res) => {
    try {
        const reqBody = req.body;
        checkBody(reqBody);
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

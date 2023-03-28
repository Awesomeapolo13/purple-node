import express from 'express';
import { handleCityAdd, handleCityRemove } from '../../handlers/city.handler.js';

const cityRouter = express.Router();

/**
 * Вернет ошибку, если тело запроса не валидно.
 */
const checkBody = (reqBody) => {
    if (reqBody.city) {
        throw new Error('Не передан город');
    }

    return Boolean(reqBody.city);
}

cityRouter.post('/add', async (req, res) => {
    try {
        const reqBody = req.body;
        checkBody(reqBody);
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
        checkBody(reqBody);
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

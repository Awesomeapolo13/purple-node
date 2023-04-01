import express from 'express';
import {handleAllWeatherListGet, handleCityWeatherGet} from '../../handlers/weather.handler.js';
import {logLanguageDict} from '../../dictionaries/log.language.dictionary.js';
import {getKeyValue, TOKEN_DICTIONARY} from '../../services/storage.service.js';

const weatherRouter = express.Router();

const checkWeatherBody = (reqBody) => {
    if (!reqBody.city) {
        throw new Error('Не передан город');
    }

    return Boolean(reqBody.city);
}

const getErrorResponse = async (err) => {
    const langKey = await getKeyValue(TOKEN_DICTIONARY.language);
    const resp = {
        success: false,
        message: null,
    }
    if (err?.response?.status === 404) {
        resp.message = logLanguageDict[langKey].wrongCitySetUpMsg;
    } else if (err?.response?.status === 401) {
        resp.message = logLanguageDict[langKey].wrongTokenSetUpMsg;
    } else {
        console.log(err.message);
        resp.message = err.message;
    }

    return resp;
}

weatherRouter.get('/', async (req, res) => {
    try {
        const reqBody = req.query;
        checkWeatherBody(reqBody)
        res.status(200).json(await handleCityWeatherGet(reqBody));
    } catch (err) {
        console.log(err.message);
        res.status(400).json(await getErrorResponse(err));
    }
});

weatherRouter.get('/all', async (req, res) => {
    try {
        res.status(200).json(await handleAllWeatherListGet());
    } catch (err) {
        console.log(err.message);
        res.status(400).json(await getErrorResponse(err));
    }
});

export {weatherRouter};

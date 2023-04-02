import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    language: 'language'
};

const isExist = async (path) => {
    try {
        await promises.stat(path);

        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Получает значение по ключу.
 *
 * @param key
 * @returns {Promise<undefined|*>}
 */
const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);

        // Если запрашивается язык, но нет сохраненных настроек, то возвращаем ru по умолчанию.
        return key === 'language' && !data[key] ? 'ru' : data[key];
    }

    return undefined;
}

/**
 * Сохраняет значение по ключу.
 *
 * @param key
 * @param value
 * @returns {Promise<void>}
 */
const saveKeyValue = async (key, value) => {
    let data = {};
    if (await  isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

/**
 * Добавляет значение в ключ-список.
 *
 * @param key
 * @param value
 * @returns {Promise<void>}
 */
const addKeyValue = async (key, value) => {
    let data = {};
    if (await  isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    // Создаем ключ объекта, если такого нет.
    if (!data[key]) {
        data[key] = [];
    }

    if (!data[key].includes(value)) {
        data[key].push(value);
        await promises.writeFile(filePath, JSON.stringify(data));
    }
};

const removeKeyValue = async (key, value) => {
    let data = {};
    if (await  isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    // Создаем ключ объекта, если такого нет.
    if (!data[key]) {
        data[key] = [];
    }

    const valueId = data[key].indexOf(value);
    if (valueId > -1) {
        data[key].splice(valueId, 1);
    }

    await promises.writeFile(filePath, JSON.stringify(data));
};

export { saveKeyValue, getKeyValue, addKeyValue, removeKeyValue, TOKEN_DICTIONARY };
import { saveKeyValue, TOKEN_DICTIONARY } from '../services/storage.service.js';

const handleLogin = async (reqBody) => {
    if (!reqBody.token) {
        throw Error('Для авторизации передайте токен');
    }

    await saveKeyValue(TOKEN_DICTIONARY.token, reqBody.token);

    return {
        success: true,
        message: 'Ваш токен сохранен',
    }
};

export { handleLogin };

import chalk from 'chalk';
import dedent from 'dedent-js';

/**
 * Словарь сообщений для вывода в консоли.
 */
const logLanguageDict = {
    en: {
        help: dedent(
            `${chalk.bgCyan(' HELP ')}
        /weather?city={{city_name}} - to show a weather for sent city only
        /weather/all - to show a weather for all cities from your list
        /help [GET] - to show a helping information
        /city/add [POST] - to add a city to your list
        /city/remove [DELETE] - to remove a city from your list
        /lang/set [POST] - to set up a language (only ru and en access now)
        /login [POST] - to set up an auth token
        `
        ),
        weather: (res, icon) => {
            return dedent(
                `${chalk.bgYellow(' WEATHER ')} The weather from ${res.name} city
        ${icon} ${res.weather[0].description}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}%
        Wind speed: ${res.wind.speed}
        `
            )
        },
        saveTokenSuccess: 'Token was saved successfully',
        tokenIsEmptyMsg: 'Token is empty',
        saveCitySuccess: 'City was saved successfully',
        removeCitySuccess: 'City was removed successfully',
        cityIsEmptyMsg: 'City is empty',
        saveLangSuccess: 'The language is empty',
        langIsEmptyMsg: 'The language settings was saved successfully',
        wrongTokenSetUpMsg: 'Wrong token data',
        wrongCitySetUpMsg: 'Wrong city data',
    },
    ru: {
        help: dedent(
            `${chalk.bgCyan(' HELP ')}
        /weather?city={{city_name}} - получение погоды только для переданного города
        /weather/all - получение погоды для всех городов из списка
        /help [GET] - вывести справку по работе с API
        /city/add [POST] - добавить город в список
        /city/remove [DELETE] - удалить город из списка
        /lang/set [POST] - устанавливает языковые настройки (сейчас доступны только ru и en)
        /login [POST] - устанавливает авторизационный токен
        `
        ),
        weather: (res, icon) => {
            return dedent(
                `${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
        ${icon} ${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Скорость ветка: ${res.wind.speed}
        `
            )
        },
        saveTokenSuccess: 'Токен сохранен',
        tokenIsEmptyMsg: 'Не передан токен',
        saveCitySuccess: 'Город сохранен',
        removeCitySuccess: 'Город удален',
        cityIsEmptyMsg: 'Не передан город',
        saveLangSuccess: 'Не передан язык',
        langIsEmptyMsg: 'Языковые настройки сохранены',
        wrongTokenSetUpMsg: 'Неверно указан токен',
        wrongCitySetUpMsg: 'Неверно указан город',
    },
};

export { logLanguageDict };

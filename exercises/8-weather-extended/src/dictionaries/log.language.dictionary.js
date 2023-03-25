import chalk from 'chalk';
import dedent from 'dedent-js';

/**
 * Словарь сообщений для вывода в консоли.
 */
const logLanguageDict = {
    en: {
        help: dedent(
            `${chalk.bgCyan(' HELP ')}
        Without parameters - to show a weather
        -h [HELP] - to show a helping information
        -s [CITY] - to add a city
        -r [CITY] - to remove a city
        -l [LANGUAGE] - to set up a language (only ru and en access now)
        -t [API_KEY] - to set up a token
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
        Без параметров - вывод погоды
        -h [HELP] - справка
        -s [CITY] - добавить город в список
        -r [CITY] - удалить город из списка
        -l [LANGUAGE] - установить языковые настройки (сейчас доступно только ru и en)
        -t [API_KEY] - для сохранения токена
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
        wrongTokenSetUpMsg: 'Неверно указан город',
        wrongCitySetUpMsg: 'Неверно указан токен',
    },
};

export { logLanguageDict };

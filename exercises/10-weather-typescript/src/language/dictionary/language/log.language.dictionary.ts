import { LanguageEnum } from './language.enum';
import { LanguageMsgInterface } from './language.msg.interface';

export class LogLanguageDictionary {
	public static readonly AVAILABLE_LANGS = LanguageEnum;
	public static readonly en: LanguageMsgInterface = {
		help: `[HELP]
         /weather?city={{city_name}} - to show a weather for sent city only
        /weather/all - to show a weather for all cities from your list
        /help [GET] - to show a helping information
        /city/add [POST] - to add a city to your list
        /city/remove [DELETE] - to remove a city from your list
        /lang/set [POST] - to set up a language (only ru and en access now)
        /login [POST] - to set up an auth token`,
		weather: (
			name: string,
			description: string,
			temp: number,
			feels_like: number,
			humidity: number,
			windSpeed: number,
			icon: string,
		) => {
			return `[WEATHER]
            The weather from ${name} city
            ${icon} ${description}
            Temperature: ${temp} (feels like ${feels_like})
            Humidity: ${humidity}%
            Wind speed: ${windSpeed}
            `;
		},
		saveTokenSuccess: 'Token was saved successfully',
		tokenIsEmptyMsg: 'Token is empty',
		tokenEmptyForLogin: 'Send a token to have a successful authorization.',
		tokenErrorMsg: 'Authentication error, please, get another try later',
		saveCitySuccess: 'City was saved successfully',
		removeCitySuccess: 'City was removed successfully',
		cityIsEmptyMsg: 'City is empty',
		cityIsExists: 'Such city is already exists in the list.',
		cityIsNotExists: 'Such city is not exists in the list.',
		saveLangSuccess: 'The language is empty',
		langIsEmptyMsg: 'The language settings was saved successfully',
		isNotAvailableLang: 'Sent language settings are not allowed now. Please choose en or ru.',
		wrongTokenSetUpMsg: 'Wrong token data',
		wrongCitySetUpMsg: 'Wrong city data',
		smtWentWrong: 'Something went wrong. Please try again later...',
	};

	public static readonly ru: LanguageMsgInterface = {
		help: `[HELP]
         /weather?city={{city_name}} - получение погоды только для переданного города
         /weather/all - получение погоды для всех городов из списка
         /help [GET] - вывести справку по работе с API
         /city/add [POST] - добавить город в список
         /city/remove [DELETE] - удалить город из списка
         /lang/set [POST] - устанавливает языковые настройки (сейчас доступны только ru и en)
         /login [POST] - устанавливает авторизационный токен,
        `,
		weather: (
			name: string,
			description: string,
			temp: number,
			feels_like: number,
			humidity: number,
			windSpeed: number,
			icon: string,
		) => {
			return `[WEATHER]
            Погода в городе ${name}
            ${icon} ${description}
            Температура: ${temp} (ощущается как ${feels_like})
            Влажность: ${humidity}%
            Скорость ветра: ${windSpeed}
            `;
		},
		saveTokenSuccess: 'Токен сохранен.',
		tokenIsEmptyMsg: 'Не передан токен.',
		tokenEmptyForLogin: 'Для авторизации передайте токен.',
		tokenErrorMsg: 'Ошибка аутентификации попробуйте позднее',
		saveCitySuccess: 'Город успешно сохранен.',
		removeCitySuccess: 'Город успешно удален.',
		cityIsEmptyMsg: 'Не передан город',
		cityIsExists: 'Данный город уже присутствует в списке.',
		cityIsNotExists: 'Данный город уже отсутствует в списке.',
		langIsEmptyMsg: 'Не передан язык.',
		saveLangSuccess: 'Языковые настройки сохранены.',
		isNotAvailableLang: 'Переданные языковые настройки пока не доступны. Выберите en или ru.',
		wrongTokenSetUpMsg: 'Неверно указан токен.',
		wrongCitySetUpMsg: 'Неверно указан город.',
		smtWentWrong: 'Что-то пошло не так, попробуйте позднее...',
	};
}

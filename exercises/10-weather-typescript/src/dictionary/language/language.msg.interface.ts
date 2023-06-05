import { ApiWeatherRespType } from '../../service/weather.api/api.weather.resp.type';

export interface LanguageMsgInterface {
	help: string;
	weather: ({ name, weather, main, wind }: ApiWeatherRespType, icon: string) => string;
	saveTokenSuccess: string;
	tokenIsEmptyMsg: string;
	tokenEmptyForLogin: string;
	tokenErrorMsg: string;
	saveCitySuccess: string;
	removeCitySuccess: string;
	cityIsEmptyMsg: string;
	cityIsExists: string;
	cityIsNotExists: string;
	saveLangSuccess: string;
	langIsEmptyMsg: string;
	isNotAvailableLang: string;
	wrongTokenSetUpMsg: string;
	wrongCitySetUpMsg: string;
	smtWentWrong: string;
}

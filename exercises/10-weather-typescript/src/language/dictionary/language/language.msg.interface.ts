export interface LanguageMsgInterface {
	help: string;
	weather: (
		name: string,
		description: string,
		temp: number,
		feels_like: number,
		humidity: number,
		windSpeed: number,
		icon: string,
	) => string;
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

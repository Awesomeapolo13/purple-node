export interface LanguageMsgInterface {
    help: string,
        // weather: (
        //     { name, weather, main, wind }: Response,
        //     icon: string
        // ) => {
        //     return `[WEATHER]
        //     The weather from ${name} city
        //     ${icon} ${weather[0].description}
        //     Temperature: ${main.temp} (feels like ${main.feels_like})
        //     Humidity: ${main.humidity}%
        //     Wind speed: ${wind.speed}
        //     `
        // },
    saveTokenSuccess: string,
    tokenIsEmptyMsg: string,
    tokenEmptyForLogin: string,
    tokenErrorMsg: string,
    saveCitySuccess: string,
    removeCitySuccess: string,
    cityIsEmptyMsg: string,
    cityIsExists: string,
    cityIsNotExists: string,
    saveLangSuccess: string,
    langIsEmptyMsg: string,
    isNotAvailableLang: string,
    wrongTokenSetUpMsg: string,
    wrongCitySetUpMsg: string,
    smtWentWrong: string,
}
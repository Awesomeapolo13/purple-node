export type ApiWeatherRespType = {
    weather: {id: number, main: string, description: string, icon: string}[];
    name: string;
    main: {temp: number, feels_like: number, humidity: number}
    wind: {speed: number}
}

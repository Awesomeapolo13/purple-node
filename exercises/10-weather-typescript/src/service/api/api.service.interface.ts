export interface ApiServiceInterface {
    readonly ICONS: object;

    getIcon: (icon: string) => string;
    getWeather: (city: string) => Promise<object>;
}

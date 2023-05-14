import {CityDto} from "./dto/city.dto";

export interface CityHandlerInterface {
    /**
     * Добавляет город в список получения прогноза погоды.
     */
    handleCityAdd: ({ city }: CityDto) => Promise<string>;
    /**
     * Убирает город из списка получения прогноза погоды.
     */
    handleCityRemove: ({ city }: CityDto) => Promise<string>;
}

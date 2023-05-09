import {CityDto} from "./dto/city.dto";

export interface CityHandlerInterface {
    handleCityAdd: ({ city }: CityDto) => Promise<string>;
    handleCityRemove: ({ city }: CityDto) => Promise<string>;
}

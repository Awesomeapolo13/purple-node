import {IsString} from "class-validator";

export class WeatherDto {
    @IsString({message: 'Не передан город'})
    city: string;
}

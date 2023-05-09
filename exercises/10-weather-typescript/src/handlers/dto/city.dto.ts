import { IsString } from "class-validator";

export class CityDto {
    @IsString({message: 'Не передан город'})
    city: string;
}

import {IsNotEmpty, IsString} from "class-validator";

export class UserLoginDto {
    @IsString({message: 'Не передан OpenWeather API токен'})
    @IsNotEmpty({message: 'Token was saved successfully'})
    token: string;
}

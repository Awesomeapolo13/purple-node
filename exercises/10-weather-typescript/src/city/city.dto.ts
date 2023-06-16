import { IsString } from 'class-validator';

export class CityDto {
	@IsString({ message: 'wrongCitySetUpMsg' })
	city: string;
}

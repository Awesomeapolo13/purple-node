import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверный email' })
	email: string;
	@IsString({ message: 'Не указан пароль email' })
	name: string;
	@IsString({ message: 'Не верно указан пароль' })
	password: string;
}

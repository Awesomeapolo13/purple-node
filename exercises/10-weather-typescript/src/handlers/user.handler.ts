import { UserHandlerInterface } from "./user.handler.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "../entity/user.entity";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";
import {AllowedTokenEnum} from "../service/storage/allowed.token.enum";
import {ConfigServiceInterface} from "../config/config.service.interface";

@injectable()
export class UserHandler implements UserHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface
	) {
	}
	async handleLogin({ token }: UserLoginDto): Promise<boolean> {
		try {
			await this.storageService.saveKeyValue(AllowedTokenEnum.TOKEN, token);
		} catch (e) {
			return false;
		}

		return true;
	}

	async handleRegister({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get<string>('SALT');
		console.log(salt)
		await newUser.setPassword(password, Number(salt));
		// проверка что он есть. если есть то его вернем, нет - null
		// Сохранение токена пользователя и отдача сообщения об успехе.

		return null;
	}
}

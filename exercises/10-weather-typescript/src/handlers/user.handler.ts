import { UserHandlerInterface } from "./user.handler.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "../entity/user.entity";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {StorageServiceInterface} from "../service/storage/storage.service.interface";
import {AllowedTokenEnum} from "../service/storage/allowed.token.enum";

@injectable()
export class UserHandler implements UserHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface
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
		await newUser.setPassword(password);
		// проверка что он есть. если есть то его вернем, нет - null
		// Сохранение токена пользователя и отдача сообщения об успехе.

		return null;
	}
}

import { UserHandlerInterface } from './user.handler.interface';
import { UserLoginDto } from './user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { StorageServiceInterface } from '../service/storage/storage.service.interface';
import { AllowedTokenEnum } from '../service/storage/allowed.token.enum';
import { ConfigServiceInterface } from '../config/config.service.interface';

@injectable()
export class UserHandler implements UserHandlerInterface {
	constructor(
		@inject(TYPES.StorageService) private readonly storageService: StorageServiceInterface,
		@inject(TYPES.ConfigService) private readonly configService: ConfigServiceInterface,
	) {}
	async handleLogin({ token }: UserLoginDto): Promise<boolean> {
		try {
			await this.storageService.saveKeyValue(AllowedTokenEnum.TOKEN, token);
		} catch (e) {
			return false;
		}

		return true;
	}
}

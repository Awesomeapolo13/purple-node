import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
	@IsString({ message: 'wrongTokenSetUpMsg' })
	@IsNotEmpty({ message: 'tokenIsEmptyMsg' })
	token: string;
}

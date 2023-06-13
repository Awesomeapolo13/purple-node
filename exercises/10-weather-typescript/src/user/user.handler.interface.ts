import { UserLoginDto } from './user-login.dto';

export interface UserHandlerInterface {
	handleLogin: (userDto: UserLoginDto) => Promise<string>;
}

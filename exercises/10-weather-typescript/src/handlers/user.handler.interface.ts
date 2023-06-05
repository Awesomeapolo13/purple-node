import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from '../entity/user.entity';

export interface UserHandlerInterface {
	handleLogin: (userDto: UserLoginDto) => Promise<boolean>;
	handleRegister: (registerDto: UserRegisterDto) => Promise<User | null>;
}

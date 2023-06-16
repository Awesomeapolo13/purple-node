import { ConfigServiceInterface } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { LoggerInterface } from '../logger/logger.interface';

@injectable()
export class ConfigService implements ConfigServiceInterface {
	private readonly config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {
		const result: DotenvConfigOutput = config();
		result.error
			? this.logger.error('Could not read .env file.')
			: (this.config = result.parsed as DotenvParseOutput);
	}

	get<T extends string>(key: string): T {
		return this.config[key] as T;
	}
}

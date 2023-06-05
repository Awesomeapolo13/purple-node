import { IsString } from 'class-validator';

export class LanguageDto {
	@IsString({ message: 'Не язык' })
	lang: string;
}

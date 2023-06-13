import { IsString } from 'class-validator';
import { ValidationErrorCodeEnum } from '../common/error/validation.error.code.enum';

export class LanguageDto {
	@IsString({ message: ValidationErrorCodeEnum.LANG_IS_EMPTY_CODE })
	lang: string;
}

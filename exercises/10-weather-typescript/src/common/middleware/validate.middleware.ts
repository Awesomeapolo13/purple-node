import { MiddlewareInterface } from './middleware.interface';
import { Request, NextFunction, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements MiddlewareInterface {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ method, query, body }: Request, res: Response, next: NextFunction): void {
		const instance = this.mapToDto(method, query, body);
		validate(instance).then((errors) => {
			// Определить сообщение об ошибрах по их ключам.
			errors.length > 0 ? res.status(400).send(errors) : next();
		});
	}

	private mapToDto(method: string, query: any, body: any): object {
		switch (method) {
			case 'GET':
				return plainToInstance(this.classToValidate, query);
			case 'POST':
				return plainToInstance(this.classToValidate, body);
			default:
				return plainToInstance(this.classToValidate, null);
		}
	}
}

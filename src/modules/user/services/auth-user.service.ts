import { compare } from 'bcryptjs';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { config } from '@core/config';
import { ErrorHandler } from '@core/models';
import { UserRepository } from '../repositories';
import { IUserSession } from '../contracts';

export abstract class AuthUserService {
	public static async execute(request: Request): Promise<IUserSession> {
		const { body } = request;
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findOne({ where: { login: body.login } });
		const passwordMatcher = await compare(body.password, user?.password || '');

		if (!user || !passwordMatcher) {
			throw new ErrorHandler('Login ou senha incorretos');
		}

		const token = sign({}, config.jwt.secret, {
			subject: user.id,
			expiresIn: config.jwt.expiresIn
		});

		return { user, token };
	}
}

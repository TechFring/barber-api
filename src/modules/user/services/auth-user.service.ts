import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import { config } from '@core/config';
import { UserRepository } from '../repositories';
import { IUserSession } from '../contracts';

export abstract class AuthUserService {
	public static async execute(login: string, password: string): Promise<IUserSession> {
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findOne({ where: { login } });
		const passwordMatcher = await compare(password, user?.password || '');

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

import { hash } from 'bcryptjs';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { config } from '@core/config';
import { CreateLogService } from '@modules/logs/services';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class UpdateUserService {
	public static async execute(request: Request): Promise<UserEntity> {
		const { params, body, user: authUser } = request;
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findByIdOrFail(params.id, false);

		await repository.checkLogin(body.login, params.id);
		await CreateLogService.execute(`O usuário ${authUser.login} atualizou o usuário ${user.login}`);

		user.name = body.name;
		user.login = body.login;
		user.level = body.level;

		if (body.password) {
			const hashedPassword = await hash(body.password, config.bcrypt.passwordSalt);
			user.password = hashedPassword;
		}

		return repository.save(user);
	}
}

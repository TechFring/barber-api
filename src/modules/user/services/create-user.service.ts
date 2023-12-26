import { hash } from 'bcryptjs';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { config } from '@core/config';
import { CreateLogService } from '@modules/logs/services';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class CreateUserService {
	public static async execute(request: Request): Promise<UserEntity> {
		const { body, user: authUser } = request;
		const repository = getCustomRepository(UserRepository);

		await repository.checkLogin(body.login);

		const hashedPassword = await hash(body.password, config.bcrypt.passwordSalt);
		const user = repository.create({ ...body, password: hashedPassword } as UserEntity);

		await CreateLogService.execute(`O usuário ${authUser.login} cadastrou o usuário ${user.login}`);

		return repository.save(user);
	}
}

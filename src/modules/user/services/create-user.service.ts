import { hash } from 'bcryptjs';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class CreateUserService {
	public static async execute(request: Request): Promise<UserEntity> {
		const { body } = request;
		const repository = getCustomRepository(UserRepository);

		await repository.checkLogin(body.login);

		const hashedPassword = await hash(body.password, 8);
		const user = repository.create({ ...body, password: hashedPassword } as UserEntity);

		return repository.save(user);
	}
}

import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { IPayload } from '../contracts';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class CreateUserService {
	public static async execute(payload: IPayload): Promise<UserEntity> {
		const repository = getCustomRepository(UserRepository);

		await repository.checkLogin(payload.login);

		const hashedPassword = await hash(payload.password, 8);
		const user = repository.create({ ...payload, password: hashedPassword });
		return repository.save(user);
	}
}

import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class SearchUserService {
	public static async execute(request: Request): Promise<UserEntity> {
		const { params } = request;
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findByIdOrFail(params.id, false);

		return user; 
	}
}

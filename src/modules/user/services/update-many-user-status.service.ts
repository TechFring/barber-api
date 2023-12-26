import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class UpdateManyUserStatusService {
	public static async execute(request: Request, active = true): Promise<UserEntity[]> {
		const { body, user: authUser } = request;
		const repository = getCustomRepository(UserRepository);
		const users = await repository.findByIdsOrFail(body.ids);
		const usersLogins = users.map(b => b.login).join(', ');

		await CreateLogService.execute(`O usuário ${authUser.login} ${active ? 'ativou' : 'inativou'} os usuários: ${usersLogins}`);

		users.forEach(user => user.active = active);

		return repository.save(users);
	}
}

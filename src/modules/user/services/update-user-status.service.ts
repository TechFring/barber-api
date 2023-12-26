import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

export abstract class UpdateUserStatusService {
	public static async execute(request: Request, active = true): Promise<UserEntity> {
		const { params, user: authUser } = request;
		const repository = getCustomRepository(UserRepository);
		const user = await repository.findByIdOrFail(params.id, false);

		await CreateLogService.execute(`O usuário ${authUser.login} ${active ? 'ativou' : 'inativou'} o usuário ${user.login}`);

		user.active = active;

		return repository.save(user);
	}
}

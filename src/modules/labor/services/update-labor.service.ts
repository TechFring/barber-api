import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class UpdateLaborService {
	public static async execute(request: Request): Promise<LaborEntity> {
		const { params, body, user } = request;
		const repository = getCustomRepository(LaborRepository);
		const labor = await repository.findByIdOrFail(params.id);

		await repository.checkName(body.name, params.id);
		await CreateLogService.execute(`O usuário ${user.login} atualizou o serviço ${labor.name}`);

		labor.name = body.name;

		return repository.save(labor);
	}
}

import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class CreateLaborService {
	public static async execute(request: Request): Promise<LaborEntity> {
		const { body, user } = request;
		const repository = getCustomRepository(LaborRepository);

		await repository.checkName(body.name);

		const labor = repository.create(body as LaborEntity);

		await CreateLogService.execute(`O usuário ${user.login} cadastrou o serviço ${labor.name}`);

		return repository.save(labor);
	}
}

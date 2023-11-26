import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class CreateLaborService {
	public static async execute(request: Request): Promise<LaborEntity> {
		const { body, user } = request;
		const repository = getCustomRepository(LaborRepository);

		await repository.checkName(body.name);

		const labor = repository.create(body as LaborEntity);
		const logDescription = `O usuário ${user.name} cadastrou o serviço ${labor.name}`;

		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Create);

		return repository.save(labor);
	}
}

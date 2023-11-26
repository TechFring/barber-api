import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class UpdateLaborService {
	public static async execute(request: Request): Promise<LaborEntity> {
		const { params, body, user } = request;
		const repository = getCustomRepository(LaborRepository);
		const labor = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} atualizou o registro do serviço ${labor.name}`;

		await repository.checkName(body.name, params.id);
		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Update);

		labor.name = body.name;

		return repository.save(labor);
	}
}

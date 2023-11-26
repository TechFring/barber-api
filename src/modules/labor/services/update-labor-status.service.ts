import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class UpdateLaborStatusService{
	public static async execute(request: Request, active = true): Promise<LaborEntity> {
		const { params, user } = request;
		const repository = getCustomRepository(LaborRepository);
		const labor = await repository.findByIdOrFail(params.id);

		await CreateLogService.execute(`O usuário ${user.name} ${active ? 'ativou' : 'inativou'} o serviço ${labor.name}`);

		labor.active = active;

		return repository.save(labor);
	}
}

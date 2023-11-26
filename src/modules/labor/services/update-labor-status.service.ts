import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class UpdateLaborStatusService{
	public static async execute(request: Request, active = true): Promise<LaborEntity> {
		const { params, user } = request;
		const repository = getCustomRepository(LaborRepository);
		const labor = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} ${active ? 'ativou' : 'inativou'} o serviço ${labor.name}`;

		await CreateLogService.execute(user.id, logDescription, active ? LogActionEnum.Activate : LogActionEnum.Inactivate);

		labor.active = active;

		return repository.save(labor);
	}
}

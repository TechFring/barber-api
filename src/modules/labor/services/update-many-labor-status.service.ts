import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class UpdateManyLaborStatusService {
	public static async execute(request: Request, active = true): Promise<LaborEntity[]> {
		const { body, user } = request;
		const repository = getCustomRepository(LaborRepository);
		const labors = await repository.findByIdsOrFail(body.ids, false);
		const laborsNames = labors.map(l => l.name).join(', ');
		const logDescription = `O usuário ${user.name} ${active ? 'ativou' : 'inativou'} os registros dos serviços: ${laborsNames}`;

		await CreateLogService.execute(user.id, logDescription, active ? LogActionEnum.Activate : LogActionEnum.Inactivate);

		labors.forEach(labor => labor.active = active);

		return repository.save(labors);
	}
}

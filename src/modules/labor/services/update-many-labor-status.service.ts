import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class UpdateManyLaborStatusService {
	public static async execute(request: Request, active = true): Promise<LaborEntity[]> {
		const { body, user } = request;
		const repository = getCustomRepository(LaborRepository);
		const labors = await repository.findByIdsOrFail(body.ids, false);
		const laborsNames = labors.map(l => l.name).join(', ');

		await CreateLogService.execute(`O usuário ${user.login} ${active ? 'ativou' : 'inativou'} os serviços: ${laborsNames}`);

		labors.forEach(labor => labor.active = active);

		return repository.save(labors);
	}
}

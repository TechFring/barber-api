import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class UpdateManyBarberStatusService {
	public static async execute(request: Request, active = true): Promise<BarberEntity[]> {
		const { body, user } = request;
		const repository = getCustomRepository(BarberRepository);
		const barbers = await repository.findByIdsOrFail(body.ids);
		const barbersNames = barbers.map(b => b.name).join(', ');
		const logDescription = `O usuário ${user.name} ${active ? 'ativou' : 'inativou'} os registros dos barbeiros: ${barbersNames}`;

		await CreateLogService.execute(user.id, logDescription, active ? LogActionEnum.Activate : LogActionEnum.Inactivate);

		barbers.forEach(barber => barber.active = active);

		return repository.save(barbers);
	}
}

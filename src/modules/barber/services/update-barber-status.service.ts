import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class UpdateBarberStatusService {
	public static async execute(request: Request, active = true): Promise<BarberEntity> {
		const { params, user } = request;
		const repository = getCustomRepository(BarberRepository);
		const barber = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} ${active ? 'ativou' : 'inativou'} o barbeiro ${barber.name}`;

		await CreateLogService.execute(user.id, logDescription, active ? LogActionEnum.Activate : LogActionEnum.Inactivate);

		barber.active = active;

		return repository.save(barber);
	}
}

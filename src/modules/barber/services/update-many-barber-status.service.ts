import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class UpdateManyBarberStatusService {
	public static async execute(request: Request, active = true): Promise<BarberEntity[]> {
		const { body, user } = request;
		const repository = getCustomRepository(BarberRepository);
		const barbers = await repository.findByIdsOrFail(body.ids);
		const barbersNames = barbers.map(b => b.name).join(', ');

		await CreateLogService.execute(`O usuário ${user.login} ${active ? 'ativou' : 'inativou'} os barbeiros: ${barbersNames}`);

		barbers.forEach(barber => barber.active = active);

		return repository.save(barbers);
	}
}

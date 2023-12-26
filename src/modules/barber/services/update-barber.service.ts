import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class UpdateBarberService {
	public static async execute(request: Request): Promise<BarberEntity> {
		const { params, body, user } = request;
		const repository = getCustomRepository(BarberRepository);
		const barber = await repository.findByIdOrFail(params.id, false);

		await repository.checkEmail(body.email, params.id);
		await repository.checkDocument(body.document, params.id);
		await CreateLogService.execute(`O usuário ${user.login} atualizou o barbeiro ${barber.name}`);

		barber.name = body.name;
		barber.email = body.email;
		barber.date_birth = body.date_birth;
		barber.document = body.document;

		return repository.save(barber);
	}
}

import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class UpdateBarberService {
	public static async execute(request: Request): Promise<BarberEntity> {
		const { params, body, user } = request;
		const repository = getCustomRepository(BarberRepository);
		const barber = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} atualizou o registro do barbeiro ${barber.name}`;

		await repository.checkEmail(body.email, params.id);
		await repository.checkDocument(body.document, params.id);
		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Update);

		barber.name = body.name;
		barber.email = body.email;
		barber.date_birth = body.date_birth;
		barber.document = body.document;

		return repository.save(barber);
	}
}

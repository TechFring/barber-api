import { getCustomRepository } from 'typeorm';
import { Request } from 'express';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class CreateBarberService {
	public static async execute(request: Request): Promise<BarberEntity> {
		const { body, user } = request;
		const barberRepository = getCustomRepository(BarberRepository);
		
		await barberRepository.checkEmail(body.email);
		await barberRepository.checkDocument(body.document);
		
		const barber = barberRepository.create(body as BarberEntity);
		const logDescription = `O usuário ${user.name} cadastrou o barbeiro ${barber.name}`;

		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Create);

		return barberRepository.save(barber);
	}
}

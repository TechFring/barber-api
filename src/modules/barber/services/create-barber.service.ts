import { getCustomRepository } from 'typeorm';
import { Request } from 'express';
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

		await CreateLogService.execute(`O usuário ${user.login} cadastrou o barbeiro ${barber.name}`);

		return barberRepository.save(barber);
	}
}

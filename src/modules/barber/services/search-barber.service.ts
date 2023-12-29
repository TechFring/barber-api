import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { BarberEntity } from '../entities';
import { BarberRepository } from '../repositories';

export abstract class SearchBarberService {
	public static async execute(request: Request): Promise<BarberEntity> {
		const { params } = request;
		const repository = getCustomRepository(BarberRepository);
		const barber = await repository.findByIdOrFail(params.id, false);

		return barber;
	}
}

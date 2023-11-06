import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import BarberEntity from '../entities/barber.entity';

export default abstract class SearchBarberService {
	public static async execute(id: string): Promise<BarberEntity> {
		const repository = getRepository(BarberEntity);
		const barber = await repository.findOne(id);

		if (!barber) {
			throw new ErrorHandler('Barbeiro não encontrado');
		}

		return barber;
	}
}

import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import BarberEntity from '../entities/barber.entity';

export default abstract class UpdateBarberStatusService {
	public static async execute(id: string, active = true): Promise<void> {
		const repository = getRepository(BarberEntity);
		const barber = await repository.findOne(id);

		if (!barber) {
			throw new ErrorHandler('Barbeiro não encontrado');
		}

		barber.active = active;
		await repository.save(barber);
	}
}

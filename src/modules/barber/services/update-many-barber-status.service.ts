import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import BarberEntity from '../entities/barber.entity';

export default abstract class UpdateManyBarberStatusService {
	public static async execute(ids: string[], active = true): Promise<void> {
		const repository = getRepository(BarberEntity);
		const barbers = await repository.findByIds(ids);

		if (!barbers.length) {
			throw new ErrorHandler('Nenhum barbeiro informado foi encontrado');
		}

		barbers.forEach(barber => barber.active = active);
		await repository.save(barbers);
	}
}

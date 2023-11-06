import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import LaborEntity from '../entities/labor.entity';

export default abstract class UpdateLaborStatusService{
	public static async execute(id: string, active = true): Promise<void> {
		const repository = getRepository(LaborEntity);
		const labor = await repository.findOne(id);

		if (!labor) {
			throw new ErrorHandler('Serviço não encontrado');
		}

		labor.active = active;
		await repository.save(labor);
	}
}

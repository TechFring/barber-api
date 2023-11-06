import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import LaborEntity from '../entities/labor.entity';

export default abstract class UpdateManyLaborStatusService {
	public static async execute(ids: string[], active = true): Promise<void> {
		const repository = getRepository(LaborEntity);
		const labors = await repository.findByIds(ids);

		if (!labors.length) {
			throw new ErrorHandler('Nenhuma serviço informado foi encontrado');
		}

		labors.forEach(labor => labor.active = active);
		await repository.save(labors);
	}
}

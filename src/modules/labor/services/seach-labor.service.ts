import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import LaborEntity from '../entities/labor.entity';

export default abstract class SearchLaborService {
	public static async execute(id: string): Promise<LaborEntity> {
		const repository = getRepository(LaborEntity);
		const labor = await repository.findOne(id);

		if (!labor) {
			throw new ErrorHandler('Serviço não encontrado');
		}

		return labor;
	}
}

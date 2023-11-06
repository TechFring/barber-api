import { getRepository } from 'typeorm';
import { ILaborPayload } from '../contracts';
import LaborEntity from '../entities/labor.entity';
import ErrorHandler from '@core/models/error-handler.model';

export default abstract class UpdateLaborService {
	public static async execute(payload: ILaborPayload): Promise<LaborEntity> {
		const repository = getRepository(LaborEntity);
		const labor = await repository.findOne(payload.id);

		if (!labor) {
			throw new ErrorHandler('Serviço não encontrado');
		}

		const nameAlreadyUsed = await repository.findOne({ where: { name: payload.name } });

		if (nameAlreadyUsed && nameAlreadyUsed.id !== labor.id) {
			throw new ErrorHandler('O nome informado já está em uso');
		}

		labor.name = payload.name;

		return repository.save(labor);
	}
}

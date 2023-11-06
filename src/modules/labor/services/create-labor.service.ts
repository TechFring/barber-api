import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import { ILaborPayload } from '../contracts';
import LaborEntity from '../entities/labor.entity';

type TPayload = Omit<ILaborPayload, 'id'>;

export default abstract class CreateLaborService {
	public static async execute(payload: TPayload): Promise<LaborEntity> {
		const repository = getRepository(LaborEntity);
		const nameAlreadyUsed = await repository.findOne({ where: { name: payload.name } });

		if (nameAlreadyUsed) {
			throw new ErrorHandler('O nome informado já está em uso');
		}

		const labor = repository.create(payload);
		return repository.save(labor);
	}
}

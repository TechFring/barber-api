import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import BarberEntity from '../entities/barber.entity';
import { IBarberPayload } from '../contracts';

type TPayload = Omit<IBarberPayload, 'id'>;

export default abstract class CreateBarberService {
	public static async execute(payload: TPayload): Promise<BarberEntity> {
		const repository = getRepository(BarberEntity);
		const emailAlreadyUsed = await repository.findOne({ where: { email: payload.email } });

		if (emailAlreadyUsed) {
			throw new ErrorHandler('O email informado já está em uso');
		}

		const docAlreadyUsed = await repository.findOne({ where: { document: payload.document } });

		if (docAlreadyUsed) {
			throw new ErrorHandler('O documento informado já está em uso');
		}

		const barber = repository.create(payload);
		return repository.save(barber);
	}
}

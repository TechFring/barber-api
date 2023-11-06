import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import BarberEntity from '../entities/barber.entity';
import { IBarberPayload } from '../contracts';

export default abstract class UpdateBarberService {
	public static async execute(payload: IBarberPayload): Promise<BarberEntity> {
		const repository = getRepository(BarberEntity);
		const barber = await repository.findOne(payload.id);

		if (!barber) {
			throw new ErrorHandler('Barbeiro não encontrado');
		}

		const emailAlreadyUsed = await repository.findOne({ where: { email: payload.email } });

		if (emailAlreadyUsed && emailAlreadyUsed.id !== barber.id) {
			throw new ErrorHandler('O email informado já está em uso');
		}

		const docAlreadyUsed = await repository.findOne({ where: { document: payload.document } });

		if (docAlreadyUsed && docAlreadyUsed.id !== barber.id) {
			throw new ErrorHandler('O documento informado já está em uso');
		}

		barber.name = payload.name;
		barber.email = payload.email;
		barber.date_birth = payload.date_birth;
		barber.document = payload.document;

		return repository.save(barber);
	}
}

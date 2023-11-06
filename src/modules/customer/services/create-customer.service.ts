import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import CustomerEntity from '../entities/customer.entity';
import { ICustomerPayload } from '../contracts';

type TPayload = Omit<ICustomerPayload, 'id'>;

export default abstract class CreateCustomerService {
	public static async execute(payload: TPayload): Promise<CustomerEntity> {
		const repository = getRepository(CustomerEntity);
		const phoneAlreadyUsed = await repository.findOne({ where: { phone: payload.phone } });

		if (phoneAlreadyUsed) {
			throw new ErrorHandler('O telefone informado já está em uso');
		}

		const emailAlreadyUsed = await repository.findOne({ where: { email: payload.email } });

		if (emailAlreadyUsed) {
			throw new ErrorHandler('O email informado já está em uso');
		}

		const customer = repository.create(payload);
		return repository.save(customer);
	}
}

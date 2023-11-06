import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import { ICustomerPayload } from '../contracts';
import CustomerEntity from '../entities/customer.entity';

export default abstract class UpdateCustomerService {
	public static async execute(payload: ICustomerPayload): Promise<CustomerEntity> {
		const repository = getRepository(CustomerEntity);
		const customer = await repository.findOne(payload.id);

		if (!customer) {
			throw new ErrorHandler('Cliente não encontrado');
		}

		const emailAlreadyUsed = await repository.findOne({ where: { email: payload.email } });

		if (emailAlreadyUsed && emailAlreadyUsed.id !== customer.id) {
			throw new ErrorHandler('O email informado já está em uso');
		}

		const phoneAlreadyUsed = await repository.findOne({ where: { phone: payload.phone } });

		if (phoneAlreadyUsed && phoneAlreadyUsed.id !== customer.id) {
			throw new ErrorHandler('O telefone informado já está em uso');
		}

		customer.name = payload.name;
		customer.email = payload.email;
		customer.phone = payload.phone;

		return repository.save(customer);
	}
}

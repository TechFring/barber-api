import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import CustomerEntity from '../entities/customer.entity';

export default abstract class UpdateCustomerStatusService {
	public static async execute(id: string, active = true): Promise<void> {
		const repository = getRepository(CustomerEntity);
		const customer = await repository.findOne(id);

		if (!customer) {
			throw new ErrorHandler('Cliente não encontrado');
		}

		customer.active = active;
		await repository.save(customer);
	}
}

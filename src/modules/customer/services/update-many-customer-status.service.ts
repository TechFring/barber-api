import { getRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import CustomerEntity from '../entities/customer.entity';

export default abstract class UpdateManyCustomerStatusService {
	public static async execute(ids: string[], active = true): Promise<void> {
		const repository = getRepository(CustomerEntity);
		const customers = await repository.findByIds(ids);

		if (!customers.length) {
			throw new ErrorHandler('Nenhum cliente informado foi encontrado');
		}

		customers.forEach(customer => customer.active = active);
		await repository.save(customers);
	}
}

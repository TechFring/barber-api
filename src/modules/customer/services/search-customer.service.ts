import { getRepository } from 'typeorm';
import CustomerEntity from '../entities/customer.entity';
import ErrorHandler from '@core/models/error-handler.model';

export default abstract class SearchCustomerService {
	public static async execute(id: string): Promise<CustomerEntity> {
		const repository = getRepository(CustomerEntity);
		const customer = await repository.findOne(id);

		if (!customer) {
			throw new ErrorHandler('Cliente não encontrado');
		}

		return customer; 
	}
}

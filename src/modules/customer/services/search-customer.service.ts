import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class SearchCustomerService {
	public static async execute(request: Request): Promise<CustomerEntity> {
		const { params } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customer = await repository.findByIdOrFail(params.id, false);

		return customer; 
	}
}

import { getCustomRepository } from 'typeorm';
import { Request } from 'express';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class CreateCustomerService {
	public static async execute(request: Request): Promise<CustomerEntity> {
		const { body, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		
		await repository.checkEmail(body.email);
		await repository.checkPhone(body.phone);

		const customer = repository.create(body as CustomerEntity);

		await CreateLogService.execute(`O usuário ${user.login} cadastrou o cliente ${customer.name}`);

		return repository.save(customer);
	}
}

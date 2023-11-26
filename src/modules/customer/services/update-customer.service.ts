import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class UpdateCustomerService {
	public static async execute(request: Request): Promise<CustomerEntity> {
		const { params, body, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customer = await repository.findByIdOrFail(params.id);

		await repository.checkEmail(body.email, params.id);
		await repository.checkPhone(body.phone, params.id);
		await CreateLogService.execute(`O usuário ${user.name} atualizou o cliente ${customer.name}`);

		customer.name = body.name;
		customer.email = body.email;
		customer.phone = body.phone;

		return repository.save(customer);
	}
}

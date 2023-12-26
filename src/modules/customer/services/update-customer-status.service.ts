import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class UpdateCustomerStatusService {
	public static async execute(request: Request, active = true): Promise<CustomerEntity> {
		const { params, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customer = await repository.findByIdOrFail(params.id, false);

		await CreateLogService.execute(`O usuário ${user.login} ${active ? 'ativou' : 'inativou'} o cliente ${customer.name}`);

		customer.active = active;

		return repository.save(customer);
	}
}

import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class UpdateManyCustomerStatusService {
	public static async execute(request: Request, active = true): Promise<CustomerEntity[]> {
		const { body, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customers = await repository.findByIdsOrFail(body.ids);
		const customersNames = customers.map(b => b.name).join(', ');

		await CreateLogService.execute(`O usuário ${user.login} ${active ? 'ativou' : 'inativou'} os clientes: ${customersNames}`);

		customers.forEach(customer => customer.active = active);

		return repository.save(customers);
	}
}

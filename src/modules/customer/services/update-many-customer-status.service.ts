import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class UpdateManyCustomerStatusService {
	public static async execute(request: Request, active = true): Promise<CustomerEntity[]> {
		const { body, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customers = await repository.findByIdsOrFail(body.ids);
		const customersNames = customers.map(b => b.name).join(', ');
		const logDescription = `O usuário ${user.name} ${active ? 'ativou' : 'inativou'} os registros dos clientes: ${customersNames}`;

		await CreateLogService.execute(user.id, logDescription, active ? LogActionEnum.Activate : LogActionEnum.Inactivate);

		customers.forEach(customer => customer.active = active);

		return repository.save(customers);
	}
}

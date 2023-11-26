import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class UpdateCustomerStatusService {
	public static async execute(request: Request, active = true): Promise<CustomerEntity> {
		const { params, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customer = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} ${active ? 'ativou' : 'inativou'} o cliente ${customer.name}`;

		await CreateLogService.execute(user.id, logDescription, active ? LogActionEnum.Activate : LogActionEnum.Inactivate);

		customer.active = active;

		return repository.save(customer);
	}
}

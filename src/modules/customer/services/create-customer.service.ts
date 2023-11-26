import { getCustomRepository } from 'typeorm';
import { Request } from 'express';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class CreateCustomerService {
	public static async execute(request: Request): Promise<CustomerEntity> {
		const { body, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		
		await repository.checkEmail(body.phone);
		await repository.checkPhone(body.email);

		const customer = repository.create(body as CustomerEntity);
		const logDescription = `O usuário ${user.name} cadastrou o cliente ${customer.name}`;

		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Create);

		return repository.save(customer);
	}
}

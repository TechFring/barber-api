import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { CustomerEntity } from '../entities';
import { CustomerRepository } from '../repositories';

export abstract class UpdateCustomerService {
	public static async execute(request: Request): Promise<CustomerEntity> {
		const { params, body, user } = request;
		const repository = getCustomRepository(CustomerRepository);
		const customer = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} atualizou o registro do cliente ${customer.name}`;

		await repository.checkEmail(body.email, params.id);
		await repository.checkPhone(body.phone, params.id);
		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Update);

		customer.name = body.name;
		customer.email = body.email;
		customer.phone = body.phone;

		return repository.save(customer);
	}
}

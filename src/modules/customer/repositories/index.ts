import { EntityRepository, Repository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import CustomerEntity from '../entities/customer.entity';

@EntityRepository(CustomerEntity)
export default class CustomerRepository extends Repository<CustomerEntity> {
	public async findByIdOrFail(id: string, active = true): Promise<CustomerEntity> {
		const customer = active
			? await this.findOne(id, { where: { active } })
			: await this.findOne(id);
		
		if (!customer) {
			throw new ErrorHandler('Cliente não encontrado');
		}

		return customer;
	}
}

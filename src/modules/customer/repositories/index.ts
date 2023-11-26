import { EntityRepository, Not, Repository } from 'typeorm';
import { ErrorHandler } from '@core/models';
import { CustomerEntity } from '../entities';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
	public async findByIdOrFail(id: string, active = true): Promise<CustomerEntity> {
		const customer = active
			? await this.findOne(id, { where: { active } })
			: await this.findOne(id);
		
		if (!customer) {
			throw new ErrorHandler('Cliente não encontrado');
		}

		return customer;
	}

	public async findByIdsOrFail(ids: string[]): Promise<CustomerEntity[]> {
		const customers = await this.findByIds(ids);

		if (!customers.length) {
			throw new ErrorHandler('Nenhum cliente informado foi encontrado');
		}

		return customers;
	}

	public async checkEmail(email: string, id?: string): Promise<void> {
		const customer = id
			? await this.findOne({ where: { id: Not(id), email } })
			: await this.findOne({ where: { email } });

		if (customer) {
			throw new ErrorHandler('O email informado já está em uso');
		}
	}

	public async checkPhone(phone: string, id?: string): Promise<void> {
		const customer = id
			? await this.findOne({ where: { id: Not(id), phone } })
			: await this.findOne({ where: { phone } });

		if (customer) {
			throw new ErrorHandler('O telefone informado já está em uso');
		}
	}
}

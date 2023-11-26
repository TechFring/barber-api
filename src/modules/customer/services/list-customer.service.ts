import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { buildFilterUtil } from '@shared/utils';
import { CustomerRepository } from '../repositories';

export abstract class ListCustomerService {
	public static async execute(request: Request): Promise<PaginationAwareObject> {
		const { query } = request;
		const repository = getCustomRepository(CustomerRepository);
		const filter = buildFilterUtil(query);

		return repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.orderBy('active', 'DESC')
			.addOrderBy('name', 'ASC')
			.paginate();
	}
}

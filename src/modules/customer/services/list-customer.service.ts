import { getRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import buildFilterUtil from '@shared/utils/build-filter.util';
import CustomerEntity from '../entities/customer.entity';
import { ICustomerPayload } from '../contracts';

type TQuery = Partial<Omit<ICustomerPayload, 'id'>>;

export default abstract class ListCustomerService {
	public static async execute(query: TQuery): Promise<PaginationAwareObject> {
		const repository = getRepository(CustomerEntity);
		const filter = buildFilterUtil(query);
		return repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.orderBy('active', 'DESC')
			.addOrderBy('name', 'ASC')
			.paginate();
	}
}

import { getCustomRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import buildFilterUtil from '@shared/utils/build-filter.util';
import { IPayload } from '../contracts';
import { UserRepository } from '../repositories';

type TQuery = Partial<Omit<IPayload, 'id'>>;

export abstract class ListUserService {
	public static async execute(query: TQuery): Promise<PaginationAwareObject> {
		const repository = getCustomRepository(UserRepository);
		const filter = buildFilterUtil(query);
		return repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.orderBy('active', 'DESC')
			.addOrderBy('name', 'ASC')
			.paginate();
	}
}

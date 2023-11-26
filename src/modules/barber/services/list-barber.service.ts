import { getCustomRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { Request } from 'express';
import { buildFilterUtil } from '@shared/utils';
import { BarberRepository } from '../repositories';

export abstract class ListBarberService {
	public static async execute(request: Request): Promise<PaginationAwareObject> {
		const { query } = request;
		const repository = getCustomRepository(BarberRepository);
		const filter = buildFilterUtil(query);

		return repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.orderBy('active', 'DESC')
			.addOrderBy('name', 'ASC')
			.paginate();
	}
}

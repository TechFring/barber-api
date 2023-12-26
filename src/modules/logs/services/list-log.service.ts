import { Request } from 'express';
import { getRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { buildFilterUtil } from '@shared/utils';
import { LogEntity } from '../entities';

export abstract class ListLogService {
	public static async execute(request: Request): Promise<PaginationAwareObject> {
		const { query } = request;
		const repository = getRepository(LogEntity);
		const filter = buildFilterUtil(query, ['created_at']);
		const createdAt = query.created_at as string;
		

		if (createdAt) {
			filter.query += Object.keys(filter.query).length ? ' AND ' : '';
			filter.query += `created_at::TEXT LIKE :created_at`;
			filter.parameters['created_at'] = `${createdAt}%`;
		}

		return repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.addOrderBy('created_at', 'DESC')
			.paginate();
	}
}

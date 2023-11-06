import { getRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import buildFilterUtil from '@shared/utils/build-filter.util';
import LaborEntity from '../entities/labor.entity';
import { ILaborPayload } from '../contracts';

type TQuery = Partial<Omit<ILaborPayload, 'id'>>;

export default abstract class ListLaborService {
	public static async exeucte(query: TQuery): Promise<PaginationAwareObject> {
		const repository = getRepository(LaborEntity);
		const filter = buildFilterUtil(query);
		return repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.orderBy('active', 'DESC')
			.addOrderBy('name', 'ASC')
			.paginate();
	}
}

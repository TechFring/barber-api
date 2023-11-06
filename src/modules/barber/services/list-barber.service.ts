import { getRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import buildFilterUtil from '@shared/utils/build-filter.util';
import BarberEntity from '../entities/barber.entity';
import { IBarberPayload } from '../contracts';

type TQuery = Partial<Omit<IBarberPayload, 'id' | 'date_birth'>>;

export default class ListBarberService {
	public static async execute(query: TQuery): Promise<PaginationAwareObject> {
		const repository = getRepository(BarberEntity);
		const filter = buildFilterUtil(query);
		return await repository.createQueryBuilder()
			.where(filter.query, filter.parameters)
			.orderBy('active', 'DESC')
			.addOrderBy('name', 'ASC')
			.paginate();
	}
}

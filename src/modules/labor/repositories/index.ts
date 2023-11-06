import { EntityRepository, Repository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import LaborEntity from '../entities/labor.entity';

@EntityRepository(LaborEntity)
export default class LaborRepository extends Repository<LaborEntity> {
	public async findByIdsOrFail(ids: string[], active = true): Promise<LaborEntity[]> {
		const labors = active
			? await this.findByIds(ids, { where: { active } })
			: await this.findByIds(ids);
		
		if (!labors.length) {
			throw new ErrorHandler('Nenhum serviço informado foi encontrado');
		}

		return labors;
	}
}

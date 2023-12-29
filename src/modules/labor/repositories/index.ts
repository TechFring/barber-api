import { EntityRepository, Not, Repository } from 'typeorm';
import { ErrorHandler } from '@core/models';
import { LaborEntity } from '../entities';

@EntityRepository(LaborEntity)
export class LaborRepository extends Repository<LaborEntity> {
	public async findByIdOrFail(id: string, active = true): Promise<LaborEntity> {
		const labor = active
			? await this.findOne(id, { where: { active } })
			: await this.findOne(id);
		
		if (!labor) {
			throw new ErrorHandler('Serviço não encontrado');
		}

		return labor;
	}

	public async findByIdsOrFail(ids: string[], active = true): Promise<LaborEntity[]> {
		const labors = active
			? await this.findByIds(ids, { where: { active } })
			: await this.findByIds(ids);
		
		if (!labors.length) {
			throw new ErrorHandler('Nenhum serviço informado foi encontrado');
		}

		return labors;
	}

	public async checkName(name: string, id?: string): Promise<void> {
		const labor = id
			? await this.findOne({ where: { id: Not(id), name } })
			: await this.findOne({ where: { name } });

		if (labor) {
			throw new ErrorHandler('O nome informado já está em uso');
		}
	}
}

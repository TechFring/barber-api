import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LaborEntity } from '../entities';
import { LaborRepository } from '../repositories';

export abstract class SearchLaborService {
	public static async execute(request: Request): Promise<LaborEntity> {
		const { params } = request;
		const repository = getCustomRepository(LaborRepository);
		const labor = await repository.findByIdOrFail(params.id, false);

		return labor;
	}
}

import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { ScheduleEntity } from '../entities';
import { ScheduleRepository } from '../repositories';

export default abstract class SearchScheduleService {
	public static async execute(request: Request): Promise<ScheduleEntity> {
		const { params } = request;
		const repository = getCustomRepository(ScheduleRepository);
		const schedule = await repository.findByIdOrFail(params.id);

		return schedule;
	}
}

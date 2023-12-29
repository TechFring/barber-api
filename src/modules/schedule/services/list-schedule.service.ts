import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { ScheduleEntity } from '../entities';
import { ScheduleRepository } from '../repositories';

export default abstract class ListScheduleService {
	public static async execute(request: Request): Promise<ScheduleEntity[]> {
		const { query } = request;
		const repository = getCustomRepository(ScheduleRepository);

		return repository.createQueryBuilder('schedule')
			.leftJoinAndSelect('schedule.schedule_labor', 'schedule_labor')
			.where('schedule.start_time >= :startTime', { startTime: new Date(query.start_time as string) })
			.andWhere('schedule.start_time <= :endTime', { endTime: new Date(query.end_time as string) })
			.getMany()
	}
}

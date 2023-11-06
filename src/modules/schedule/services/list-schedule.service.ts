import { getCustomRepository } from 'typeorm';
import ScheduleEntity from '../entities/schedule.entity';
import ScheduleRepository from '../repositories';

export default abstract class ListScheduleService {
	public static async execute(startTime: Date, endTime: Date): Promise<ScheduleEntity[]> {
		const repository = getCustomRepository(ScheduleRepository);

		return await repository.createQueryBuilder('schedule')
			.leftJoinAndSelect('schedule.schedule_labor', 'schedule_labor')
			.where('schedule.start_time >= :startTime', { startTime })
			.andWhere('schedule.start_time <= :endTime', { endTime })
			.getMany()
	}
}

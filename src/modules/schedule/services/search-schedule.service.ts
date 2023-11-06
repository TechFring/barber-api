import { getCustomRepository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import ScheduleEntity from '../entities/schedule.entity';
import ScheduleRepository from '../repositories';

export default abstract class SearchScheduleService {
	public static async execute(id: string): Promise<ScheduleEntity> {
		const repository = getCustomRepository(ScheduleRepository);
		const schedule = await repository.findOne(id, { relations: ['schedule_labor'] });

		if (!schedule) {
			throw new ErrorHandler('Agendamento não encontrado');
		}

		return schedule;
	}
}

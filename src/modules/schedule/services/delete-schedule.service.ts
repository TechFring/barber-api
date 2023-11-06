import { getCustomRepository } from 'typeorm';
import ScheduleRepository from '../repositories';

export default abstract class DeleteScheduleService {
	public static async execute(scheduleId: string): Promise<void> {
		const repository = getCustomRepository(ScheduleRepository);
		const schedule = await repository.findByIdOrFail(scheduleId);

		await repository.remove(schedule);
	}
}

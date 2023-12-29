import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateLogService } from '@modules/logs/services';
import { ScheduleRepository } from '../repositories';

export default abstract class DeleteScheduleService {
	public static async execute(request: Request): Promise<void> {
		const { params, user } = request;
		const repository = getCustomRepository(ScheduleRepository);
		const schedule = await repository.findByIdOrFail(params.id);

		await CreateLogService.execute(`O usuário ${user.login} removeu o agendamento ${schedule.name}`);

		await repository.remove(schedule);
	}
}

import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LogActionEnum } from '@modules/logs/enums';
import { CreateLogService } from '@modules/logs/services';
import { ScheduleRepository } from '../repositories';

export default abstract class DeleteScheduleService {
	public static async execute(request: Request): Promise<void> {
		const { params, user } = request;
		const repository = getCustomRepository(ScheduleRepository);
		const schedule = await repository.findByIdOrFail(params.id);
		const logDescription = `O usuário ${user.name} removeu o agendamento ${schedule.name}`;

		await CreateLogService.execute(user.id, logDescription, LogActionEnum.Delete);

		await repository.remove(schedule);
	}
}

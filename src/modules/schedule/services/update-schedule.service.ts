import { Request } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { LaborRepository } from '@modules/labor/repositories';
import { BarberRepository } from '@modules/barber/repositories';
import { CustomerRepository } from '@modules/customer/repositories';
import { CreateLogService } from '@modules/logs/services';
import { ScheduleEntity, ScheduleLaborEntity } from '../entities';
import { ScheduleRepository } from '../repositories';
import { calculateEndTime } from '../utils';

export default abstract class UpdateScheduleService {
	public static async execute(request: Request): Promise<ScheduleEntity> {
		const { body, params, user } = request;
		const scheduleLaborRepository = getRepository(ScheduleLaborEntity);
		const scheduleRepository = getCustomRepository(ScheduleRepository);
		const laborRepository = getCustomRepository(LaborRepository);
		const barberRepository = getCustomRepository(BarberRepository);
		const customerRepository = getCustomRepository(CustomerRepository);

		const schedule = await scheduleRepository.findByIdOrFail(params.id);
		const barber = await barberRepository.findByIdOrFail(body.barber_id, false);
		const customer = await customerRepository.findByIdOrFail(body.customer_id, false);
		const labors = await laborRepository.findByIdsOrFail(body.labors, false);

		const endTime = calculateEndTime(labors, body.start_time);
		await scheduleRepository.checkAvailabilityAndFail(body.barber_id, body.start_time, endTime, body.customer_id);

		const scheduleLabors = await scheduleLaborRepository.find({ where: { schedule_id: schedule.id } });
		await scheduleLaborRepository.remove(scheduleLabors);

		await CreateLogService.execute(`O usuário ${user.login} atualizou o agendamento ${schedule.name}`);

		schedule.name = body.name;
		schedule.start_time = body.start_time;
		schedule.end_time = endTime;
		schedule.barber = barber;
		schedule.customer = customer;
		schedule.schedule_labor = labors.map((labor) => ({ labor_id: labor.id })) as ScheduleLaborEntity[];

		return scheduleRepository.save(schedule);
	}
}

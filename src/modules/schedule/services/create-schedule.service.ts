import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LaborRepository } from '@modules/labor/repositories';
import { BarberRepository } from '@modules/barber/repositories';
import { CustomerRepository } from '@modules/customer/repositories';
import { CreateLogService } from '@modules/logs/services';
import { ScheduleEntity, ScheduleLaborEntity } from '../entities';
import { ScheduleRepository } from '../repositories';
import { calculateEndTime } from '../utils';

export default abstract class CreateScheduleService {
	public static async execute(request: Request): Promise<ScheduleEntity> {
		const { body, user } = request;
		const scheduleRepository = getCustomRepository(ScheduleRepository);
		const laborRepository = getCustomRepository(LaborRepository);
		const barberRepository = getCustomRepository(BarberRepository);
		const customerRepository = getCustomRepository(CustomerRepository);

		const barber = await barberRepository.findByIdOrFail(body.barber_id);
		const customer = await customerRepository.findByIdOrFail(body.customer_id);
		const labors = await laborRepository.findByIdsOrFail(body.labors);
		const endTime = calculateEndTime(labors, body.start_time);

		await scheduleRepository.checkAvailabilityAndFail(body.barber_id, body.start_time, endTime);

		const schedule = scheduleRepository.create({
			name: body.name,
			start_time: body.start_time,
			end_time: endTime,
			barber,
			customer,
			schedule_labor: labors.map((labor) => ({ labor_id: labor.id })) as ScheduleLaborEntity[]
		});

		await CreateLogService.execute(`O usuário ${user.login} cadastrou o agendamento ${schedule.name}`);

		return scheduleRepository.save(schedule);
	}
}

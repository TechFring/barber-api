import { getCustomRepository, getRepository } from 'typeorm';
import LaborRepository from '@modules/labor/repositories';
import BarberRepository from '@modules/barber/repositories';
import CustomerRepository from '@modules/customer/repositories';
import { ISchedulePayload } from '../contracts';
import ScheduleEntity from '../entities/schedule.entity';
import ScheduleRepository from '../repositories';
import { calculateEndTime } from '../utils';
import ScheduleLaborEntity from '../entities/schedule-labor.entity';

export default abstract class UpdateScheduleService {
	public static async execute(payload: ISchedulePayload): Promise<ScheduleEntity> {
		const scheduleLaborRepository = getRepository(ScheduleLaborEntity);
		const scheduleRepository = getCustomRepository(ScheduleRepository);
		const laborRepository = getCustomRepository(LaborRepository);
		const barberRepository = getCustomRepository(BarberRepository);
		const customerRepository = getCustomRepository(CustomerRepository);

		const schedule = await scheduleRepository.findByIdOrFail(payload.id);
		const barber = await barberRepository.findByIdOrFail(payload.barber_id, false);
		const customer = await customerRepository.findByIdOrFail(payload.customer_id, false);
		const labors = await laborRepository.findByIdsOrFail(payload.labors, false);

		const endTime = calculateEndTime(labors, payload.start_time);
		await scheduleRepository.checkAvailabilityAndFail(payload.barber_id, payload.start_time, endTime, payload.customer_id);

		const scheduleLabors = await scheduleLaborRepository.find({ where: { schedule_id: schedule.id } });
		await scheduleLaborRepository.remove(scheduleLabors);

		schedule.name = payload.name;
		schedule.start_time = payload.start_time;
		schedule.end_time = endTime;
		schedule.barber = barber;
		schedule.customer = customer;
		schedule.schedule_labor = labors.map((labor) => ({ labor_id: labor.id })) as ScheduleLaborEntity[];

		return scheduleRepository.save(schedule);
	}
}

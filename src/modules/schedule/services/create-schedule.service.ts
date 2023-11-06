import { getCustomRepository } from 'typeorm';
import LaborRepository from '@modules/labor/repositories';
import BarberRepository from '@modules/barber/repositories';
import CustomerRepository from '@modules/customer/repositories';
import { ISchedulePayload } from '../contracts';
import ScheduleEntity from '../entities/schedule.entity';
import ScheduleLaborEntity from '../entities/schedule-labor.entity';
import ScheduleRepository from '../repositories';
import { calculateEndTime } from '../utils';

type TPayload = Omit<ISchedulePayload, 'id'>;

export default abstract class CreateScheduleService {
	public static async execute(payload: TPayload): Promise<ScheduleEntity> {
		const scheduleRepository = getCustomRepository(ScheduleRepository);
		const laborRepository = getCustomRepository(LaborRepository);
		const barberRepository = getCustomRepository(BarberRepository);
		const customerRepository = getCustomRepository(CustomerRepository);

		const barber = await barberRepository.findByIdOrFail(payload.barber_id);
		const customer = await customerRepository.findByIdOrFail(payload.customer_id);
		const labors = await laborRepository.findByIdsOrFail(payload.labors);

		const endTime = calculateEndTime(labors, payload.start_time);
		await scheduleRepository.checkAvailabilityAndFail(payload.barber_id, payload.start_time, endTime);

		const schedule = scheduleRepository.create({
			name: payload.name,
			start_time: payload.start_time,
			end_time: endTime,
			barber,
			customer,
			schedule_labor: labors.map((labor) => ({ labor_id: labor.id })) as ScheduleLaborEntity[]
		});

		return scheduleRepository.save(schedule);
	}
}

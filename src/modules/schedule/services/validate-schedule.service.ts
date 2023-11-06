import { getCustomRepository } from 'typeorm';
import LaborRepository from '@modules/labor/repositories';
import BarberRepository from '@modules/barber/repositories';
import LaborEntity from '@modules/labor/entities/labor.entity';
import { ISchedulePayload, IScheduleSuggestion } from '../contracts';
import ScheduleRepository from '../repositories';
import { calculateEndTime } from '../utils';
import ScheduleEntity from '../entities/schedule.entity';

type TPayload = Omit<ISchedulePayload, 'name' | 'customer_id'>;

export default abstract class ValidateScheduleService {
	public static async execute(payload: TPayload) {
		const scheduleRepository = getCustomRepository(ScheduleRepository);
		const laborRepository = getCustomRepository(LaborRepository);
		const barberRepository = getCustomRepository(BarberRepository);

		await barberRepository.findByIdOrFail(payload.barber_id, false);
		const labors = await laborRepository.findByIdsOrFail(payload.labors, false);

		const endTime = calculateEndTime(labors, payload.start_time);
		const schedule = await scheduleRepository.checkAvailability(payload.barber_id, payload.start_time, endTime);
		const available = !schedule;

		if (schedule?.id === payload?.id || available) {
			return { available: true, suggestions: [] };
		}

		const schedules = await scheduleRepository.findByBarberAndDay(payload.barber_id, new Date(payload.start_time.getTime()));
		const suggestions = getSuggestedTimes(schedules, labors, payload.start_time);

		return { available, suggestions };
	}
}

function getSuggestedTimes(schedules: ScheduleEntity[], labors: LaborEntity[], startTime: Date): IScheduleSuggestion[] {
	startTime.setHours(5, 0, 0, 0); // 08:00

	const openingTime = new Date(startTime.getTime());
  openingTime.setHours(5, 0, 0, 0); // 08:00

	const closingTime = new Date(startTime.getTime());
  closingTime.setHours(17, 0, 0, 0); // 20:00

  const suggestedTimes: IScheduleSuggestion[] = [];

  while (startTime < closingTime) {
    const endTime = calculateEndTime(labors, startTime);
    const isAvailable = isTimeAvailable(schedules, startTime, endTime) && startTime >= openingTime && endTime <= closingTime;

    if (isAvailable) {
      suggestedTimes.push({ start_time: new Date(startTime.getTime()), end_time: endTime });
    }

    startTime.setTime(endTime.getTime());
  }

  return suggestedTimes;
}

function isTimeAvailable(schedules: ScheduleEntity[], proposedStart: Date, proposedEnd: Date): boolean {
  for (const schedule of schedules) {
    const scheduleStart = new Date(schedule.start_time);
    const scheduleEnd = new Date(schedule.end_time);

    if (proposedStart < scheduleEnd && proposedEnd > scheduleStart) {
      return false;
    }
  }

  return true;
}
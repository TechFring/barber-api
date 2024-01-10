import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { LaborEntity } from '@modules/labor/entities';
import { LaborRepository } from '@modules/labor/repositories';
import { BarberRepository } from '@modules/barber/repositories';
import { IScheduleSuggestion } from '../contracts';
import { ScheduleEntity } from '../entities';
import { ScheduleRepository } from '../repositories';
import { calculateEndTime } from '../utils';

export default abstract class ValidateScheduleService {
	public static async execute(request: Request) {
		const { body } = request;
		const scheduleRepository = getCustomRepository(ScheduleRepository);
		const laborRepository = getCustomRepository(LaborRepository);
		const barberRepository = getCustomRepository(BarberRepository);

		await barberRepository.findByIdOrFail(body.barber_id, false);

		const labors = await laborRepository.findByIdsOrFail(body.labors, false);
		const endTime = calculateEndTime(labors, body.start_time);
		const schedule = await scheduleRepository.checkAvailability(body.barber_id, body.start_time, endTime);
		const available = !schedule || schedule?.id === body?.id;
		const schedules = await scheduleRepository.findByBarberAndDay(body.barber_id, new Date(body.start_time.getTime()));
		const suggestions = getSuggestedTimes(schedules, labors, body.start_time);

		return { available, suggestions };
	}
}

function getSuggestedTimes(schedules: ScheduleEntity[], labors: LaborEntity[], startTime: Date): IScheduleSuggestion[] {
  const suggestedTimes: IScheduleSuggestion[] = [];
  const interval = 3e5;

  startTime.setHours(5, 0, 0, 0); // 08:00

  const openingTime = new Date(startTime.getTime());
  openingTime.setHours(5, 0, 0, 0); // 08:00

  const closingTime = new Date(startTime.getTime());
  closingTime.setHours(17, 0, 0, 0); // 20:00

  while (startTime < closingTime) {
    const endTime = calculateEndTime(labors, startTime);
    const isAvailable = isTimeAvailable(schedules, startTime, endTime) && startTime >= openingTime && endTime <= closingTime;

    if (isAvailable) {
      suggestedTimes.push({ start_time: new Date(startTime.getTime()), end_time: endTime });
    }

    startTime.setTime(endTime.getTime() + interval);
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
import { LaborEntity } from '@modules/labor/entities';

export function calculateEndTime(labors: LaborEntity[], startTime: Date): Date {
	const duration = labors.reduce((a, b) => a + b.duration, 0);
	const endTime = new Date(startTime);
	endTime.setMinutes(startTime.getMinutes() + duration);
	return endTime;
}

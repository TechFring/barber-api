import { EntityRepository, Repository } from 'typeorm';
import { ErrorHandler } from '@core/models';
import { ScheduleEntity } from '../entities';

@EntityRepository(ScheduleEntity)
export class ScheduleRepository extends Repository<ScheduleEntity> {
	public async findByIdOrFail(id: string): Promise<ScheduleEntity> {
		const schedule = await this.findOne(id, { relations: ['schedule_labor'] });
		
		if (!schedule) {
			throw new ErrorHandler('Agendamento não encontrado');
		}

		return schedule;
	}

	public async checkAvailability(barberId: string, startTime: Date, endTime: Date): Promise<ScheduleEntity | undefined> {
		return await this.createQueryBuilder()
			.where('start_time <= :endTime', { endTime })
			.andWhere('end_time >= :startTime', { startTime })
			.andWhere('barber_id = :barberId', { barberId })
			.getOne();
	}

	public async checkAvailabilityAndFail(barberId: string, startTime: Date, endTime: Date, customerId?: string): Promise<void> {
		const schedule = await this.checkAvailability(barberId, startTime, endTime);

		if (schedule && schedule?.customer_id !== customerId) {
			throw new ErrorHandler('O barbeiro não possui disponibilidade no horário informado');
		}
	}

	public async findByBarberAndDay(barberId: string, startTime: Date): Promise<ScheduleEntity[]> {
		return this.createQueryBuilder()
			.where('DATE(start_time) = DATE(:startTime)', { startTime })
			.andWhere('barber_id = :barberId', { barberId })
			.getMany();
	}
}

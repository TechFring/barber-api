import { EntityRepository, Repository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import BarberEntity from '../entities/barber.entity';

@EntityRepository(BarberEntity)
export default class BarberRepository extends Repository<BarberEntity> {
	public async findByIdOrFail(id: string, active = true): Promise<BarberEntity> {
		const barber = active
			? await this.findOne(id, { where: { active } })
			: await this.findOne(id);
		
		if (!barber) {
			throw new ErrorHandler('Barbeiro não encontrado');
		}

		return barber;
	}
}

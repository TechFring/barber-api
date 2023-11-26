import { EntityRepository, Repository, Not } from 'typeorm';
import { ErrorHandler } from '@core/models';
import { BarberEntity } from '../entities';

@EntityRepository(BarberEntity)
export class BarberRepository extends Repository<BarberEntity> {
	public async findByIdOrFail(id: string, active = true): Promise<BarberEntity> {
		const barber = active
			? await this.findOne(id, { where: { active } })
			: await this.findOne(id);
		
		if (!barber) {
			throw new ErrorHandler('Barbeiro não encontrado');
		}

		return barber;
	}

	public async findByIdsOrFail(ids: string[]): Promise<BarberEntity[]> {
		const barbers = await this.findByIds(ids);

		if (!barbers.length) {
			throw new ErrorHandler('Nenhum barbeiro informado foi encontrado');
		}

		return barbers;
	}

	public async checkEmail(email: string, id?: string): Promise<void> {
		const barber = id
			? await this.findOne({ where: { id: Not(id), email } })
			: await this.findOne({ where: { email } });

		if (barber) {
			throw new ErrorHandler('O email informado já está em uso');
		}
	}

	public async checkDocument(document: string, id?: string): Promise<void> {
		const barber = id
			? await this.findOne({ where: { id: Not(id), document } })
			: await this.findOne({ where: { document } });

		if (barber) {
			throw new ErrorHandler('O documento informado já está em uso');
		}
	}
}

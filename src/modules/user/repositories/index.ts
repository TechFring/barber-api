import { EntityRepository, Repository } from 'typeorm';
import ErrorHandler from '@core/models/error-handler.model';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
	public async findByIdOrFail(id: string, active = true): Promise<UserEntity> {
		const user = active
			? await this.findOne(id, { where: { active } })
			: await this.findOne(id);

		if (!user) {
			throw new ErrorHandler('Usuário não encontrado');
		}

		return user;
	}

	public async checkLogin(login: string): Promise<void> {
		const user = await this.findOne({ where: { login } });

		if (user) {
			throw new ErrorHandler('O login informado já está em uso');
		}
	}
}

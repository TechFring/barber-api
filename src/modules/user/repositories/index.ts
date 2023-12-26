import { EntityRepository, Not, Repository } from 'typeorm';
import { ErrorHandler } from '@core/models';
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

	public async findByIdsOrFail(ids: string[]): Promise<UserEntity[]> {
		const users = await this.findByIds(ids);

		if (!users.length) {
			throw new ErrorHandler('Nenhum usuário informado foi encontrado');
		}

		return users;
	}

	public async checkLogin(login: string, id?: string): Promise<void> {
		const user = id
			? await this.findOne({ where: { id: Not(id), login } })
			: await this.findOne({ where: { login } });

		if (user) {
			throw new ErrorHandler('O login informado já está em uso');
		}
	}
}

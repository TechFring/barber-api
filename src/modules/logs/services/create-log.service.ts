import { getRepository } from 'typeorm';
import { LogEntity } from '../entities';
import { LogActionEnum } from '../enums';

export abstract class CreateLogService {
	public static async execute(userId: string, description: string, action: LogActionEnum): Promise<LogEntity> {
		const repository = getRepository(LogEntity);
		const log = repository.create({ user_id: userId, description, action });

		return repository.save(log);
	}
}

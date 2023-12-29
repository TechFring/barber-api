import { getRepository } from 'typeorm';
import { LogEntity } from '../entities';

export abstract class CreateLogService {
	public static async execute(description: string): Promise<LogEntity> {
		const repository = getRepository(LogEntity);
		const log = repository.create({ description });

		return repository.save(log);
	}
}

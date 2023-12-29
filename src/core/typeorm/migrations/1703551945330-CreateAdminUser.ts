import { hash } from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { config } from '@core/config';
import { UserEntity } from '@modules/user/entities';
import { UserLevelEnum } from '@modules/user/enums';

export class CreateAdminUser1703551945330 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const adminUser = new UserEntity();
		adminUser.name = process.env.ADMIN_NAME as string;
		adminUser.login = process.env.ADMIN_LOGIN as string;
		adminUser.password = await hash(process.env.ADMIN_PASSWORD as string, config.bcrypt.passwordSalt);
		adminUser.level = UserLevelEnum.Admin;

		await queryRunner.manager.save(adminUser);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}
}

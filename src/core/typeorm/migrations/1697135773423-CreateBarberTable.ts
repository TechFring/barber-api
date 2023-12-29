import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBarberTable1697135773423 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'barber',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'document',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'date_birth',
						type: 'date',
						isNullable: true,
					},
					{
						name: 'active',
						type: 'boolean',
						default: true
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('barber');
	}
}

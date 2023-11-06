import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateScheduleTable1697857684173 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'schedule',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'barber_id',
						type: 'uuid',
					},
					{
						name: 'customer_id',
						type: 'uuid',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'start_time',
						type: 'timestamp with time zone'
					},
					{
						name: 'end_time',
						type: 'timestamp with time zone'
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
				foreignKeys: [
					{
						name: 'ScheduleBarber',
						referencedTableName: 'barber',
						referencedColumnNames: ['id'],
						columnNames: ['barber_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'ScheduleCustomer',
						referencedTableName: 'customer',
						referencedColumnNames: ['id'],
						columnNames: ['customer_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				]
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('schedule');
	}
}

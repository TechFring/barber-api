import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateScheduleLaborTable1697858671310 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'schedule_labor',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'schedule_id',
						type: 'uuid',
					},
					{
						name: 'labor_id',
						type: 'uuid',
					},
				],
				foreignKeys: [
					{
						name: 'ScheduleLaborSchedule',
						referencedTableName: 'schedule',
						referencedColumnNames: ['id'],
						columnNames: ['schedule_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'ScheduleLaborLabor',
						referencedTableName: 'labor',
						referencedColumnNames: ['id'],
						columnNames: ['labor_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('schedule_labor');
	}
}

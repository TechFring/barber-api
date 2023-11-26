import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLogTable1699925800875 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'log',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user_id',
						type: 'uuid',
					},
					{
						name: 'action',
						type: 'int',
					},
					{
						name: 'description',
						type: 'varchar',
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
						name: 'LogUser',
						referencedTableName: 'user',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('log');
	}
}

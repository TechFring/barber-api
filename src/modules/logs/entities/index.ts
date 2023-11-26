import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('log')
export class LogEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public description: string;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}

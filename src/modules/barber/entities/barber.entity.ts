import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ScheduleEntity } from '@modules/schedule/entities';

@Entity('barber')
export class BarberEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@OneToMany(() => ScheduleEntity, schedule => schedule.barber)
	public schedule: ScheduleEntity[];

	@Column()
	public name: string;

	@Column()
	public email: string;

	@Column()
	public document: string;

	@Column('date')
	public date_birth: Date;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	public updated_at: Date;
}

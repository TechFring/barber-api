import ScheduleEntity from '@modules/schedule/entities/schedule.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('barber')
export default class BarberEntity {
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

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;
}
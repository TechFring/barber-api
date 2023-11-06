import ScheduleEntity from '@modules/schedule/entities/schedule.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('customer')
export default class CustomerEntity {
	@PrimaryGeneratedColumn()
	public id: string;
	
	@OneToMany(() => ScheduleEntity, schedule => schedule.customer)
	public schedule: ScheduleEntity[];

	@Column()
	public name: string;

	@Column()
	public phone: string;

	@Column()
	public email: string;

	@Column('boolean')
	public active: boolean;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;
}
